/**
 * Exit codes used to off the app.
 */
module.exports = {
  /**
   * A peaceful & expected death.
   */
  OK: 0,

  /**
   * A generic and unexpected ending for our hero.
   */
  GENERIC: 1,

  /**
   * Cannot find Create React App version.
   */
  CREATE_REACT_APP_VERSION: 2,

  /**
   * Invalid Project name.
   */
  PROJECT_NAME: 3,

  /**
   * This directory already exists
   */
  DIRECTORY_EXISTS: 4,

  /**
   * Problem creating an app with Create React App
   */
  CREATE_REACT_APP_INSTALL: 5,

  /**
   * This is not a compatible ignite-react-app CLI directory.
   */
  NOT_IGNITE_REACT_APP_PROJECT: 6,

  /**
   * Invalid component name
   */
  COMPONENT_NAME: 7,

  /**
   * This component already exists
   */
  COMPONENT_EXISTS: 8,

  /**
   * Invalid container name
   */
  CONTAINER_NAME: 9,

  /**
   * This container already exists
   */
  CONTAINER_EXISTS: 10,

  /**
   * This is not a normal ir-app plugin.
   */
  PLUGIN_INVALID: 11,

  /**
   * Invalid Plugin name.
   */
  PLUGIN_NAME: 12,

  /**
   * An plugin bombed while installing.
   */
  PLUGIN_INSTALL: 13
};
