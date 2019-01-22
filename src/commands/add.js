// @cliDescription Adds an Ignite plugin.
// @cliAlias a
// ----------------------------------------------------------------------------

const R = require('ramda');
const detectedChanges = require('../lib/detectedChanges');
const detectInstall = require('../lib/detectInstall');
const importPlugin = require('../lib/importPlugin');
const isIrAppDirectory = require('../lib/isIrAppDirectory');
const findPluginFile = require('../lib/findPluginFile');
const exitCodes = require('../lib/exitCodes');

/**
 * Removes the ignite plugin.
 *
 * @param {string} moduleName The name of the ir-app-* plugin.
 * @param {Object} toolbox The gluegun toolbox.
 */
const removeIrAppPlugin = async (moduleName, toolbox) => {
  const { print, system, ignite } = toolbox;

  print.warning('Rolling back...run with --debug to see more info');

  if (ignite.useYarn) {
    system.run(`yarn remove ${moduleName} --dev`);
  } else {
    system.run(`npm rm ${moduleName} --save-dev`);
  }
};

module.exports = {
  name: 'add',
  run: async function(toolbox) {
    const { print, filesystem, prompt, ignite, parameters, strings } = toolbox;
    // grab a fist-full of features...
    const { log } = ignite;

    const perfStart = new Date().getTime();

    log('running add command');
    const config = ignite.loadIgniteConfig();
    const currentGenerators = config.generators || {};

    // ensure we're in a supported directory
    if (!isIrAppDirectory(process.cwd())) {
      print.error(
        'The `ir-app add` command must be run in an ignite-compatible directory.'
      );
      process.exit(exitCodes.NOT_IGNITE_PROJECT);
    }

    const name = parameters.first;
    // the thing we're trying to install
    if (strings.isBlank(name)) {
      const instructions = `An ir-app plugin is required.

Examples:
  ir-app add /path/to/plugin/you/are/building`;
      print.info(instructions);
      process.exit(exitCodes.OK);
    }

    // we don't (yet) support scoped npm packages, so bail
    if (name.startsWith('@')) {
      print.error(
        `Error: Ignite react App CLI doesn't support scoped npm packages yet, sorry about that. Try it without the prefix.`
      );
      process.exit(exitCodes.PLUGIN_NAME);
    }

    // find out the type of install
    const specs = detectInstall(toolbox);
    const { moduleName } = specs;
    const modulePath = `${process.cwd()}/node_modules/${moduleName}`;

    log(`installing ${modulePath} from source ${specs.type}`);

    // import the ignite plugin node module
    const spinner = print.spin(`adding ${print.colors.cyan(moduleName)}`);
    // const spinner = print.spin('')

    const exitCode = await importPlugin(toolbox, specs);
    if (exitCode) {
      spinner.stop();
      process.exit(exitCode);
    }

    // optionally load some configuration from the ir-app.json from the plugin.
    const ignitePluginConfigPath = `${modulePath}/ir-app.json`;
    const newConfig = filesystem.exists(ignitePluginConfigPath)
      ? filesystem.read(ignitePluginConfigPath, 'json')
      : {};

    const proposedGenerators = R.reduce(
      (acc, k) => {
        acc[k] = moduleName;
        return acc;
      },
      {},
      newConfig.generators || []
    );
    // we compare the generator config changes against ours
    const changes = detectedChanges(currentGenerators, proposedGenerators);
    if (changes.length > 0) {
      spinner.stop();
      // we warn the user on changes
      print.warning(
        `🔥  The following generators would be changed: ${R.join(
          ', ',
          changes
        )}`
      );
      const ok = await prompt.confirm('You ok with that?');
      // if they refuse, then npm/yarn uninstall
      if (!ok) {
        await removeIrAppPlugin(moduleName, toolbox);
        process.exit(exitCodes.OK);
      }
      spinner.text = `adding ${print.colors.cyan(moduleName)}`;
      spinner.start();
    }

    // ok, are we ready?
    try {
      let pluginFile = findPluginFile(toolbox, modulePath);
      if (pluginFile) {
        // bring the ignite plugin to life
        log(`requiring ignite plugin from ${modulePath}`);
        const pluginModule = require(pluginFile);

        if (
          !pluginModule.hasOwnProperty('add') ||
          !pluginModule.hasOwnProperty('remove')
        ) {
          spinner.fail(`'add' or 'remove' method missing.`);
          process.exit(exitCodes.PLUGIN_INVALID);
        }

        // set the path to the current running ignite plugin
        ignite.setIgnitePluginPath(modulePath);

        // now let's try to run it
        try {
          // save new ignite config if something changed
          if (proposedGenerators !== {}) {
            const combinedGenerators = Object.assign(
              {},
              currentGenerators,
              proposedGenerators
            );
            const updatedConfig = R.assoc(
              'generators',
              combinedGenerators,
              ignite.loadIgniteConfig()
            );
            ignite.saveIgniteConfig(updatedConfig);
          }

          spinner.stop();
          log(`running add() on ignite plugin`);
          await pluginModule.add(toolbox);

          const perfDuration =
            parseInt((new Date().getTime() - perfStart) / 10) / 100;

          spinner.text = `added ${print.colors.cyan(
            moduleName
          )} in ${perfDuration}s`;
          spinner.start();
          spinner.succeed();

          // Sweet! We did it!
          return exitCodes.OK;
        } catch (err) {
          // it's up to the throwers of this error to ensure the error message is human friendly.
          // to do this, we need to ensure all our core features like `addModule`, `addPluginComponentExample`, etc
          // all play along nicely.
          spinner.fail(err.message);
          process.exit(exitCodes.PLUGIN_INSTALL);
        }
      } else {
        spinner.fail(`${modulePath}/plugin.js does not exist.  skipping.`);
        spinner.stop();
      }
    } catch (err) {
      // we couldn't require the plugin, it probably has some nasty js!
      spinner.fail('problem loading the plugin JS');
      await removeIrAppPlugin(moduleName, toolbox);
      log(err);
      process.exit(exitCodes.PLUGIN_INVALID);
    }
  }
};
