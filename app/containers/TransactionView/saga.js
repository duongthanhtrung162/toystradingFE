// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
 import * as _ from 'lodash';
 import * as constant from './constants'
 import * as PageActions from './actions';
import apiRequests from '../App/apiRequest'
export function* getNewestTransaction(action) {
  const { reject, resolve } = action.payload;
  
  try {
    
    const apiUrl = `https://toystrading.herokuapp.com/v1/auth/transaction`;
    const result = yield apiRequests.getRequest(apiUrl, {});
    
    
    if (result) {
      yield put(PageActions.defaultAction('newestListTransaction', result.data.data));
      resolve(result)
     
    }
  } catch (err) {
    reject(err);
  }
}
export default function* transactionViewSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(constant.ACTION_GET_NEWEST_TRANSACTION, getNewestTransaction);

}
