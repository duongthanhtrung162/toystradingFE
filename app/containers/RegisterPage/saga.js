import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import * as _ from 'lodash';
import * as constant from './constants'
import * as PageActions from './actions';
import apiRequests from '../App/apiRequest'

export function* register(action) {
  let { reject, resolve, data } = action.payload;
    data["phone"] = `${data.phone}`;
  try {
    const apiUrl = yield apiRequests.user;
    const result = yield apiRequests.postRequest(apiUrl, data);
    if (result) {
      resolve(result)
     
    }
  } catch (err) {
    reject(err);
  }
}
// Individual exports for testing
export default function* registerPageSaga() {
  yield takeLatest(constant.ACTION_REGISTER, register);
}
