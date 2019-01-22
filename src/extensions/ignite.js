// This is the Ignite CLI extension. It gets parked on `toolbox.ignite` and each
// of the functions defined here are available as functions on that.

// bring in each of the constituents
const shell = require('shelljs');
const ignitePluginPathExt = require('./ignite/ignitePluginPath');
const igniteConfigExt = require('./ignite/igniteConfig');
const findIgnitePluginsExt = require('./ignite/findIgnitePlugins');
const addModuleExt = require('./ignite/addModule');
const removeModuleExt = require('./ignite/removeModule');
const copyBatchExt = require('./ignite/copyBatch');
const setDebugConfigExt = require('./ignite/setDebugConfig');
const removeDebugConfigExt = require('./ignite/removeDebugConfig');
const patchInFileExt = require('./ignite/patchInFile');
const generateExt = require('./ignite/generate');
const logExt = require('./ignite/log');
const versionExt = require('./ignite/version');
const pluginOverridesExt = require('./ignite/pluginOverrides');

/**
 * Adds ignite goodies
 *
 * @return {Function} A function to attach to the toolbox.
 */
function attach(toolbox) {
  const { parameters } = toolbox;

  // determine which package manager to use
  const forceNpm = parameters.options.npm;

  // should we be using yarn?
  const useYarn = !forceNpm && Boolean(shell.which('yarn'));

  // the ignite plugin path
  const { ignitePluginPath, setIgnitePluginPath } = ignitePluginPathExt(
    toolbox
  );

  // a 4-pack of ignite config
  const {
    loadIgniteConfig,
    saveIgniteConfig,
    setIgniteConfig,
    removeIgniteConfig
  } = igniteConfigExt(toolbox);

  // here's the extension's abilities
  toolbox.ignite = {
    ignitePluginPath,
    setIgnitePluginPath,
    useYarn,
    loadIgniteConfig,
    saveIgniteConfig,
    setIgniteConfig,
    removeIgniteConfig,
    findIgnitePlugins: findIgnitePluginsExt(toolbox),
    addModule: addModuleExt(toolbox),
    removeModule: removeModuleExt(toolbox),
    copyBatch: copyBatchExt(toolbox),
    setDebugConfig: setDebugConfigExt(toolbox),
    removeDebugConfig: removeDebugConfigExt(toolbox),
    patchInFile: patchInFileExt(toolbox),
    generate: generateExt(toolbox),
    log: logExt(toolbox),
    version: versionExt(),
    pluginOverrides: pluginOverridesExt(toolbox)
  };
}

module.exports = attach;
