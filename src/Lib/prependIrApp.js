const path = require('path');

/**
 * Ensures the given string starts with 'ir-app-'.
 *
 * @param {string} value The string to check.
 * @returns {string} The same string, but better.
 */
const prependIrApp = function(value) {
  // If a path, ignore, it's fine
  if (value.includes(path.sep)) return value;

  return /^ir-app-/.test(value) ? value : 'ir-app-' + value;
};

module.exports = prependIrApp;
