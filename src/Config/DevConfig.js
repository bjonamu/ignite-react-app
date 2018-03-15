module.exports = `const DevConfig = {
  __DEV__: process.env.NODE_ENV !== 'production',
  useLocalAPI: false,
  /**
   * Why did you update is a function that monkey patches React and
   * notifies you in the console when potentially unnecessary re-renders occur.
   */
  whyDidYouUpdateLogging: false,
  reduxLogging: true
}

export default DevConfig
`
