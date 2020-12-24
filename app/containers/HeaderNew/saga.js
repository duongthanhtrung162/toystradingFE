// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
 import * as _ from 'lodash';
 import * as constant from './constants'
 import * as PageActions from './actions';
import apiRequests from '../App/apiRequest'
export function* getCategoryList(action) {
  
  const { reject, resolve } = action.payload;
  
  try {
    const apiUrl = yield apiRequests.category;
    const result = yield apiRequests.getRequest(apiUrl, {});
    
    if (result) {
      yield put(PageActions.defaultAction('categoryList', result.data.data));
      resolve(result)
     
    }
  } catch (err) {
    reject(err);
  }
}
export function* getTagList(action) {
  const { reject, resolve } = action.payload;
  
  try {
    const apiUrl = yield apiRequests.tag;
    const result = yield apiRequests.getRequest(apiUrl, {});
    
    if (result) {
      yield put(PageActions.defaultAction('tagList', result.data.data));
      resolve(result)
     
    }
  } catch (err) {
    reject(err);
  }
}
export default function* headerNewSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(constant.ACTION_GET_CATEGORY, getCategoryList);
  yield takeLatest(constant.ACTION_GET_TAG, getTagList);


}
