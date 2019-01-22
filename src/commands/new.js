const path = require('path');
const exitCodes = require('../lib/exitCodes');
const isIrAppDirectory = require('../lib/isIrAppDirectory');
const { forEach, trim, toLower } = require('ramda');

module.exports = {
  name: 'new',
  alias: 'n',
  run: async function(toolbox) {
    // gluegun provides all these features and more!
    const { system, print, strings, parameters, ignite, filesystem } = toolbox;
    const { isBlank } = strings;
    const { log } = ignite;

    // ensure we're not in a ir-app directory
    if (isIrAppDirectory(process.cwd())) {
      print.error(
        'The `ir-app new` command cannot be run within an already ignited project.'
      );
      process.exit(exitCodes.NOT_IGNITE_REACT_APP_PROJECT);
    }

    // grab the project name
    const projectName = parameters.first;

    // verify the project name is a thing
    if (isBlank(projectName)) {
      print.info('ir-app new <projectName>\n');
      print.error('Project name is required');
      process.exit(exitCodes.PROJECT_NAME);
    }

    // Guard against `ir-app new ignite-react-app or ir-app`
    const lowerName = toLower(projectName);
    if (lowerName === 'ignite-react-app' || lowerName === 'ir-app') {
      print.error(
        `Hey...that's my name! Please name your project something other than '${projectName}'.`
      );
      process.exit(exitCodes.PROJECT_NAME);
    }

    print.info(`🔥 igniting app ${print.colors.yellow(projectName)}`);
    print.newline();

    try {
      log(`Running create-react-app`);
      const command = trim(`npx create-react-app ${projectName}`);
      await system.exec(command, { stdio: 'inherit' });
    } catch (e) {
      print.error('error running create-react-app');
      process.exit(exitCodes.CREATE_REACT_APP_INSTALL);
    }

    process.chdir(projectName);
    log(`Switched directory to ${process.cwd()}`);

    // grab the right boilerplate

    let boilerplateName =
      parameters.options.boilerplate ||
      parameters.options.b ||
      'boilerplate-cyclops';

    // If the name includes a file separator, it's probably a path. Expand it so it's the full real path here.
    if (boilerplateName.includes(path.sep)) {
      boilerplateName = filesystem.path(boilerplateName);
    }

    log(`boilerplateName ${boilerplateName}`);

    // let's kick off the template
    let ok = false;
    try {
      const command = trim(
        `ir-app boilerplate-install ${boilerplateName} ${projectName}`
      );
      log(`running boilerplate: ${command}`);
      await system.exec(command, { stdio: 'inherit' });
      log('finished boilerplate');
      ok = true;
    } catch (e) {
      log('error running boilerplate');
      log(e);
    }

    // always clean up the app-template stuff
    log('cleaning temporary files');
    // filesystem.remove('node_modules')
    filesystem.remove('irapp');
    // filesystem.remove('package.json')

    // did we install everything successfully?
    if (ok) {
      log(`moving contents of ${projectName} into place`);
      // move everything that's 1 deep back up to here
      forEach(
        filename => filesystem.move(path.join(projectName, filename), filename),
        filesystem.list(projectName) || []
      );
      log(`removing unused sub directory ${projectName}`);
      filesystem.remove(projectName);
    }
    log('finished running new');
  }
};
