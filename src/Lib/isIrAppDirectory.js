const jetpack = require('fs-jetpack');

/**
 * Is Ignite compatible with the directory we're currently inside?
 *
 * @return true or false
 */
function isIrAppDirectory(directory) {
  // read the ignite config
  const irAppConfigPath = `${directory}/ir-app.json`;

  // it must be a file
  if (jetpack.exists(irAppConfigPath) !== 'file') return false;

  // let's read it as a JSON file
  try {
    const contents = jetpack.read(irAppConfigPath, 'json');
    // it needs to be an object
    return typeof contents === 'object';
  } catch (err) {
    return false;
  }
}

module.exports = isIrAppDirectory;
