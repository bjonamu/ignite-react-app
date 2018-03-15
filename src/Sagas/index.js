module.exports = `import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { LoginTypes } from '../Redux/LoginRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login, logout } from './LoginSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // Login
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api.login),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api.logout)
  ])
}`
