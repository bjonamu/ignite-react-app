const minimist = require('minimist');
const { build, printWtf, print } = require('gluegun');
const { isNil, isEmpty } = require('ramda');
const PrettyError = require('pretty-error');
const pe = new PrettyError();

const buildIgniteReactApp = () => {
  return build()
    .brand('ir-app')
    .src(`${__dirname}/..`)
    .plugins('./node_modules', { matching: 'ir-app-*', hidden: true })
    .help() // provides default for help, h, --help, -h
    .version() // provides default for version, v, --version, -v
    .command({
      name: 'love',
      run: toolbox => toolbox.print.info('I love Ignite React App!')
    })
    .create();
};

/**
 * Create the cli and kick it off
 */

module.exports = async function run(argv) {
  // create a runtime
  let runtime;
  try {
    runtime = buildIgniteReactApp();
  } catch (e) {
    console.log(pe.render(e));
    throw e; // rethrow
  }

  // parse the commandLine line
  const commandLine = minimist(argv.slice(2));

  // should we show the version number & jet?
  // const hasNoArguments = isEmpty(commandLine._)
  // const hasVersionOption = commandLine.version || commandLine.v
  // if (hasNoArguments && hasVersionOption) {
  //   await runtime.run({ rawCommand: 'version' })
  //   return
  // }

  // wtf mode shows problems with plugins, commands, and extensions
  if (commandLine.wtf) {
    printWtf(runtime);
    return;
  }

  if (commandLine.verbose && !commandLine.debug) {
    print.error('Use --debug instead of --verbose.');
    return;
  }

  // run the command
  let context;
  try {
    context = await runtime.run();
  } catch (e) {
    console.log(pe.render(e));
    throw e; // rethrow
  }

  if (
    commandLine.help ||
    commandLine.h ||
    isNil(context.plugin) ||
    isNil(context.command)
  ) {
    // no args, show help
    print.info('');
    // header()
    print.printCommands(context);
    print.info('');
  }

  if (context.error) {
    print.debug(context.error);
  }

  // send it back to make testing easier
  return context;
};
