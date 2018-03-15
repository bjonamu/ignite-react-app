module.exports = `import storage from 'redux-persist/lib/storage'
import immutablePersistenceTransform from '../Utils/Transforms/ImmutablePersistenceTransform'
const REDUX_PERSIST = {
  active: true,
  reducerVersion: '27',
  storeConfig: {
    key: 'ml:',
    storage,
    debounce: 500,
    // blacklist: [], // reducer keys that you do NOT want stored to persistence here
    whitelist: ['login', 'user', 'profile'], // Optionally, just specify the keys you DO want stored to
    // persistence. An empty array means 'don't store any reducers' -> infinitered/ignite#409
    transforms: [immutablePersistenceTransform]
  }
}

export default REDUX_PERSIST
`
