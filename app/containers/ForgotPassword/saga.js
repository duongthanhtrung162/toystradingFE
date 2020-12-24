// import { take, call, put, select } from 'redux-saga/effects';
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import * as _ from 'lodash';
import * as constant from './constants'
import * as PageActions from './actions';
import apiRequests from '../App/apiRequest'

export function* restartPassword(action) {
  let { reject, resolve, data } = action.payload;
  try {
    const apiUrl = yield apiRequests.restartPassword;
    const result = yield apiRequests.postRequest(apiUrl, data);
    if (result) {
      resolve(result)
     
    }
  } catch (err) {
    reject(err);
  }
}
// Individual exports for testing
export default function* forgotPasswordSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(constant.RESTART_PASSWORD, restartPassword);

}
