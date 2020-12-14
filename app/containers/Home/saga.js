// import { take, call, put, select } from 'redux-saga/effects';
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
 import * as _ from 'lodash';
 import * as constant from './constants'
 import * as PageActions from './actions';
import apiRequests from '../App/apiRequest'
// Individual exports for testing
export function* getCategoryList(action) {
  const { reject, resolve } = action.payload;
  
  try {
    const apiUrl = yield apiRequests.category;
    const result = yield apiRequests.getRequest(apiUrl, {});
    debugger
    if (result) {
      yield put(PageActions.defaultAction('categoryList', result.data.data));
      resolve(true)
     
    }
  } catch (err) {
    reject(err);
  }
}
export default function* homeSaga() {
  yield takeLatest(constant.ACTION_GET_CATEGORY, getCategoryList);
}
