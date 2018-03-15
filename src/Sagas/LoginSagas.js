module.exports = `import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'

export function * login (loginAPI, { email, password }) {
  try {
    yield put(LoginActions.clearData())
    const res = yield call(loginAPI, email, password)
    yield put(LoginActions.loginSuccess(res.data))
  } catch (error) {
    yield put(LoginActions.loginFailure(error.message))
  }
}

export function * logout (logoutAPI) {
  try {
    yield call(logoutAPI)
    yield put(LoginActions.logoutSuccess())
  } catch (error) {
    yield put(LoginActions.logoutFailure(error.message))
  }
}
`
