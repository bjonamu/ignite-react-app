module.exports = `import { createSelector } from 'reselect'

// Docs here => https://github.com/reactjs/reselect

/* ------------- Login ------------- */
const getUser = state => state.login.data


// Checks if the store has been rehydrated
const hasReydrated = state => state._persist.rehydrated

export default {
  getUser,
  hasReydrated
}
`
