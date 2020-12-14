 import { take, call, put, select, takeLatest } from 'redux-saga/effects';
 import * as _ from 'lodash';
 import * as constant from './constants'
 import * as PageActions from './actions';
import apiRequests from '../App/apiRequest'
// Individual exports for testing
export function* login(action) {
  const { reject, resolve, data } = action.payload;

  try {
    const result = yield apiRequests.login(data);
    if (result) {
      resolve(result)
     
    }
  } catch (err) {
    reject(err);
  }
}

export default function* loginSaga() {
  
  // See example in containers/HomePage/saga.js
  yield takeLatest(constant.ACTION_LOGIN, login);

}
