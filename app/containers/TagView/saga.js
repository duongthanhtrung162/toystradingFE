// import { take, call, put, select } from 'redux-saga/effects';
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
 import * as _ from 'lodash';
 import * as constant from './constants'
 import * as PageActions from './actions';
import apiRequests from '../App/apiRequest'
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
export function* createTag(action) {
  const { reject, resolve, data } = action.payload;
  
  try {
    const apiUrl = yield apiRequests.tagAuth;
    const result = yield apiRequests.postRequest(apiUrl, data);
    
    if (result) {
      resolve(result)
     
    }
  } catch (err) {
    reject(err);
  }
}
export function* updateTag(action) {
  const { reject, resolve, id ,value } = action.payload;
  
  try {
    const apiUrl = yield apiRequests.tagAuth;
    const result = yield apiRequests.putRequest(`${apiUrl}/${id}`, value);
    
    if (result) {
      resolve(result)
     
    }
  } catch (err) {
    reject(err);
  }
}
export function* deleteTag(action) {
  const { reject, resolve, data } = action.payload;
  
  try {
    const apiUrl = yield apiRequests.tagAuth;
    const result = yield apiRequests.deleteRequest(`${apiUrl}/${data}`, {});
    
    if (result) {
      resolve(result)
     
    }
  } catch (err) {
    reject(err);
  }
}
// Individual exports for testing
export default function* tagViewSaga() {
  yield takeLatest(constant.ACTION_GET_TAG, getTagList);
  yield takeLatest(constant.ACTION_DELETE_TAG, deleteTag);
  yield takeLatest(constant.ACTION_CREATE_TAG, createTag);
  yield takeLatest(constant.ACTION_UPDATE_TAG, updateTag);
}
