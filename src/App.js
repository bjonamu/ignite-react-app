module.exports = `import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'

import reduxStore from './Redux'
import RootContainer from './Containers/RootContainer'

const { persistor, store } = reduxStore()

const onBeforeLift = () => {
  // take some action before the gate lifts
}

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <PersistGate
          loading={<h3>Loading...</h3>}
          onBeforeLift={onBeforeLift}
          persistor={persistor}>
          <RootContainer />
        </PersistGate>
      </Provider>
    )
  }
}

export default App
`
