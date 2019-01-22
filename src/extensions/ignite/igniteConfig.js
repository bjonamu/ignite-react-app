const { dissoc } = require('ramda');
const igniteConfigFilename = `${process.cwd()}/ir-app.json`;

module.exports = context => {
  const { filesystem } = context;

  /**
   * Reads the contents of the ir-app.json configuration.
   *
   * @return {Object} The configuration.
   */
  function loadIgniteConfig() {
    return filesystem.exists(igniteConfigFilename)
      ? filesystem.read(igniteConfigFilename, 'json') || {}
      : {};
  }

  /**
   * Saves a new ir-app config file.
   *
   * @param {Object} config The new configuration object to save.
   */
  function saveIgniteConfig(config = {}) {
    filesystem.write(igniteConfigFilename, config, { jsonIndent: 2 });
  }

  /**
   * Sets an ir-app config setting
   *
   * @param {string} key Key of setting to be defined
   * @param {string} value Value to be set
   */
  function setIgniteConfig(key, value, isVariableName = false) {
    const igniteConfig = loadIgniteConfig();
    igniteConfig[key] = value;
    saveIgniteConfig(igniteConfig);
  }

  /**
   * Remove Global Config setting
   *
   * @param {string}  key Key of setting to be removed
   */
  function removeIgniteConfig(key) {
    const igniteConfig = dissoc(key, loadIgniteConfig());
    saveIgniteConfig(igniteConfig);
  }

  return {
    setIgniteConfig,
    removeIgniteConfig,
    saveIgniteConfig,
    loadIgniteConfig
  };
};
