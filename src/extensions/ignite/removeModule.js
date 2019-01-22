module.exports = context => {
  /**
   * Removes a npm-based module from the project.
   *
   * @param {string}  moduleName - The module name to remove.
   * @param {Object}  options - Various uninstalling flags.
   * @param {boolean} options.dev - is this a dev dependency?
   */
  async function removeModule(moduleName, options = {}) {
    const { print, system, ignite } = context;
    const { useYarn } = ignite;

    print.info(`    ${print.checkmark} uninstalling ${moduleName}`);
    print.info(`    ${print.checkmark} removing`);
    // uninstall
    if (useYarn) {
      const addSwitch = options.dev ? '--dev' : '';
      await system.run(`yarn remove ${moduleName} ${addSwitch}`);
    } else {
      const uninstallSwitch = options.dev ? '--save-dev' : '--save';
      await system.run(`npm rm ${moduleName} ${uninstallSwitch}`);
    }
  }

  return removeModule;
};
