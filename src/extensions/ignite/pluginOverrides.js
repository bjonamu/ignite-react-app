// Lists the additional places to look for plugins before falling back to npm.
const isWindows = process.platform === 'win32';
const homeDir = process.env[isWindows ? 'USERPROFILE' : 'HOME'];
const jetpack = require('fs-jetpack');
const {
  map,
  trim,
  pipe,
  prepend,
  uniq,
  filter,
  split,
  without
} = require('ramda');

module.exports = context => {
  // grab ~/.irapp/overrides
  const overrideDir = jetpack.path(`${homeDir}`, '.irapp', 'overrides');

  // grab the environment var
  const envDir = process.env.IR_APP_PLUGIN_PATH || '';

  // sanitize & verify they exist
  return pipe(
    split(';'),
    map(trim),
    prepend(overrideDir),
    without(['', null]),
    uniq,
    filter(jetpack.exists)
  )(envDir);
};
