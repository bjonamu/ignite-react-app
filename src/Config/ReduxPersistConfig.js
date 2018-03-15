module.exports = `import storage from 'redux-persist/lib/storage'
import immutablePersistenceTransform from '../Utils/ImmutablePersistenceTransform'
const REDUX_PERSIST = {
  active: true,
  reducerVersion: '1',
  storeConfig: {
    key: 'app:', // Change this key to your app key
    storage,
    debounce: 500,
    // blacklist: [], // reducer keys that you do NOT want stored to persistence here
    whitelist: ['login'], // Optionally, just specify the keys you DO want stored to
    // persistence. An empty array means 'don't store any reducers' -> infinitered/ignite#409
    transforms: [immutablePersistenceTransform]
  }
}

export default REDUX_PERSIST
`
