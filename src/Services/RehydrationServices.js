module.exports = `import ReduxPersist from '../Config/ReduxPersistConfig'
import { persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import StartupActions from '../Redux/StartupRedux'

const reconcileStore = persistor => {
  // Check to ensure latest reducer version
  const reducerVersion = ReduxPersist.reducerVersion
  storage.getItem('reducerVersion')
    .then(localVersion => {
      if (localVersion !== reducerVersion) {
        // Purge store
        persistor.purge()
        storage.setItem('reducerVersion', reducerVersion)
      }
    })
    .catch(() => {
      storage.setItem('reducerVersion', reducerVersion)
    })
}

const updateReducers = store => {
  const startup = () => store.dispatch(StartupActions.startup())
  const persistor = persistStore(store, null, startup)
  reconcileStore(persistor)
  return persistor
}

export default {
  updateReducers
}
`
