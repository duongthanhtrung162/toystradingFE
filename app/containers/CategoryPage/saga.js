// import { take, call, put, select } from 'redux-saga/effects';
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
 import * as _ from 'lodash';
 import * as constant from './constants'
 import * as PageActions from './actions';
import apiRequests from '../App/apiRequest'
// Individual exports for testing
export function* filterToy(action) {
  const { reject, resolve, data} = action.payload;
  debugger
  try {
    const apiUrl = yield apiRequests.toy;
    const result = yield apiRequests.postRequest(apiUrl, data);
    
    if (result) {
      
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
export default function* categoryPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(constant.FILTER_TOY, filterToy);
  yield takeLatest(constant.ACTION_GET_TAG, getTagList);

}
