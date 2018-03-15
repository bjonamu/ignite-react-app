module.exports = `import { createSelector } from 'reselect'

/* ------------- Login ------------- */
const getUID = state => state.login.uid

export default {
  getUID
}
`
