module.exports = `import 'normalize.css'
import './index.css'

import React from 'react'
import { render } from 'react-snapshot'
import registerServiceWorker from './registerServiceWorker'
import DevConfig from './Config/DevConfig'
import App from './App'

/**
 * Why did you update is a function that monkey patches React and
 * notifies you in the console when potentially unnecessary re-renders occur.
 */
if (DevConfig.__DEV__ && DevConfig.whyDidYouUpdateLogging) {
  import('why-did-you-update')
    .then(({ whyDidYouUpdate }) => {
      whyDidYouUpdate(React, { groupByComponent: true, collapseComponentGroups: false })
    })
    .catch(error => {
      console.log('why-did-you-update ERROR', error)
    })
}

const rootEl = document.getElementById('root')
render(<App />, rootEl)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    render(<NextApp />, rootEl)
  })
}

registerServiceWorker()
`
