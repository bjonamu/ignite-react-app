const {
  prop,
  groupBy,
  map,
  flatten,
  pipe,
  find,
  propEq,
  mapObjIndexed,
  equals,
  isNil,
  values,
  isEmpty
} = require('ramda');
const { dotPath } = require('ramdasauce');
const isIrAppDirectory = require('../lib/isIrAppDirectory');
const exitCodes = require('../lib/exitCodes');

module.exports = {
  name: 'generate',
  run: async context => {
    // ensure we're in a supported directory
    if (!isIrAppDirectory(process.cwd())) {
      context.print.error(
        'The `ir-app generate` command must be run within an already ignited project.'
      );
      process.exit(exitCodes.NOT_IGNITE_REACT_APP_PROJECT);
    }

    // grab some features
    const { ignite, print, parameters, filesystem } = context;
    const config = ignite.loadIgniteConfig();

    print.newline();

    // keys are type of generate and values are a list of options...
    const registry = pipe(
      // with each plugin
      map(plugin => {
        // load the list of generators they support within their ir-app.json
        const configFile = `${plugin.directory}/ir-app.json`;
        const config = filesystem.exists(configFile)
          ? filesystem.read(configFile, 'json')
          : {};
        const generators = config.generators || [];

        // then make a row out of them
        return map(
          type => ({
            type,
            plugin,
            command: find(propEq('name', type), plugin.commands)
          }),
          generators
        );
      }),
      flatten,
      groupBy(prop('type'))
    )(ignite.findIgnitePlugins());

    // ---------------------
    // NOTE(steve): Saving these next two for potential useful stuff

    // the plugins with only 1 slot registered per type
    // const unique = pipe(
    //   pickBy(v => v.length === 1),
    //   map(head)
    // )(registry)

    // the plugins that are competing for slots
    // const many = pickBy(v => v.length > 1, registry)
    // ---------------------

    // the list of what the user wants
    const userPrefs = config.generators || {};

    // find the exact match of plugin name & type
    const userRegistry = mapObjIndexed((pluginName, type) => {
      // let's find what the user has asked for in the list
      const lookup = find(
        option => equals(pluginName, dotPath('plugin.name', option)),
        registry[type] || []
      );

      // figure out a friendly error to show the user
      let error = null;
      let description = null;
      if (isNil(lookup)) {
        error = 'missing';
      } else if (isNil(lookup.command)) {
        error = 'missing command';
      } else if (lookup.plugin.errorState !== 'none') {
        error = `command ${lookup.plugin.errorState}`;
      } else if (lookup.command.errorState !== 'none') {
        error = `command ${lookup.command.errorState}`;
      } else {
        description = lookup.command.description;
      }

      // what our new list will look like
      return {
        type,
        pluginName,
        error,
        description,
        plugin: lookup ? lookup.plugin : null,
        command: lookup ? lookup.command : null
      };
    }, userPrefs);

    /**
     * Prints a footer used when we're unable to run a generator.
     */
    const footer = () => {
      print.info(
        print.colors.muted(
          '\n  --------------------------------------------------------------------------'
        )
      );
      print.info(
        print.colors.muted(
          `  Check out ${print.colors.white(
            'https://github.com/bjonamu/ignite-react-app'
          )} for instructions on how to`
        )
      );
      print.info(
        print.colors.muted('  install some or how to build some for yourself.')
      );
    };

    // Avast! Thar be no generators ripe for tha plunder.
    if (isEmpty(userRegistry)) {
      print.warning('⚠️  No generators detected.\n');
      print.info(
        `  ${print.colors.bold(
          'Generators'
        )} allow you to quickly make frequently created files such as:\n`
      );
      print.info(`    * components`);
      print.info(`    * conatiners`);
      print.info(`    * redux`);
      print.info(`    * and more`);
      footer();
      return;
    }

    // TODO: do we want to add items that aren't conflicts it the list?

    // TODO: how do we want to handle conflicts?  up above, i'm just calling find()

    // the type of template to generate (it's actually the 2nd because we rewrite the pluginName to be first)
    const type = parameters.first;
    const registryItem = type ? userRegistry[type] : null;

    // didn't find what we wanted?
    if (isNil(registryItem)) {
      print.info(
        `✨ Type ${print.colors.bold('ir-app generate')} ${print.colors.yellow(
          '________'
        )} to run one of these generators:\n`
      );

      const showSource = context.parameters.options.source;

      // turn into data we can print
      const data = pipe(
        values,
        map(item => [
          print.colors.yellow(item.type),
          item.error || item.description,
          showSource && print.colors.muted(item.pluginName)
        ])
      )(userRegistry);

      // and print it
      print.table(data);
      footer();

      return;
    }

    // make the call to the real generator
    context.runtime
      .run({
        pluginName: registryItem.pluginName,
        rawCommand: parameters.string,
        options: parameters.options
      })
      .then(e => {
        if (e.error) {
          print.debug(e.error);
        }
      });
  }
};
