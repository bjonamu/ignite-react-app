/**
 * Retrieves a plugin's entry point file, which is usually ./plugin.js.
 *
 * @param {Object} context         The gluegun context
 * @param {string} modulePath      The plugin module folder path
 * @returns {string} pluginFile    Path to plugin entry point file
 */

function findPluginFile(context, modulePath) {
  const { filesystem } = context;

  // Look for plugin.js
  let pluginFile =
    filesystem.exists(modulePath + '/plugin.js') === 'file' &&
    modulePath + '/plugin.js';

  return pluginFile;
}

module.exports = findPluginFile;
