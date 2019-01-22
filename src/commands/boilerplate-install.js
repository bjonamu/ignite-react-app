const detectInstall = require('../lib/detectInstall');
const isIrAppDirectory = require('../lib/isIrAppDirectory');
const importPlugin = require('../lib/importPlugin');
const exitCodes = require('../lib/exitCodes');

module.exports = {
  name: 'boilerplate-install',
  run: async function(toolbox) {
    const { print, ignite, filesystem } = toolbox;

    ignite.log('running boilerplate-install command');

    // we cannot be in an ignite directory
    if (isIrAppDirectory(process.cwd())) {
      print.error(
        'The `ir-app boilerplate-install` command must be run in an ir-app-compatible directory.'
      );
      process.exit(exitCodes.NOT_IGNITE_REACT_APP_PROJECT);
    }

    // determine where the package comes from
    const installSource = detectInstall(toolbox);
    const { moduleName } = installSource;
    const modulePath = `${process.cwd()}/node_modules/${moduleName}`;
    const boilerplateJs = modulePath + '/boilerplate.js';

    // install the plugin
    const exitCode = await importPlugin(toolbox, installSource);
    if (exitCode) {
      process.exit(exitCode);
    }

    // start the spinner
    const spinner = print.spin('installing boilerplate');

    // ensure we can find the boilerplate.js file
    if (!filesystem.exists(boilerplateJs)) {
      spinner.fail(`${moduleName} does not have a boilerplate.js`);
      process.exit(exitCodes.PLUGIN_INVALID);
    }

    // load the boilerplate.js module
    let pluginModule;
    try {
      pluginModule = require(`${modulePath}/boilerplate.js`);
    } catch (e) {
      spinner.fail(`error loading the boilerplate`);
      process.exit(exitCodes.PLUGIN_INVALID);
    }

    // must have an `install` function
    if (!pluginModule.hasOwnProperty('install')) {
      spinner.fail(`boilerplate.js is missing a 'install' function`);
      process.exit(exitCodes.PLUGIN_INVALID);
    }

    // set the path to the current running ignite plugin
    ignite.setIgnitePluginPath(modulePath);

    // stop the spinner
    spinner.stop();

    // run the boilerplate
    try {
      await pluginModule.install(toolbox);
    } catch (e) {
      print.error(
        `an error occured while installing ${moduleName} boilerplate.`
      );
      print.error(e);
    }
  }
};
