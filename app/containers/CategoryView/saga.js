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
export function* createCategory(action) {
  const { reject, resolve, data } = action.payload;
  
  try {
    const apiUrl = yield apiRequests.categoryAuth;
    const result = yield apiRequests.postRequest(apiUrl, data);
    
    if (result) {
      resolve(result)
     
    }
  } catch (err) {
    reject(err);
  }
}
export function* updateCategory(action) {
  const { reject, resolve, id ,value } = action.payload;
  
  try {
    const apiUrl = yield apiRequests.categoryAuth;
    const result = yield apiRequests.putRequest(`${apiUrl}/${id}`, value);
    
    if (result) {
      resolve(result)
     
    }
  } catch (err) {
    reject(err);
  }
}
export function* deleteCategory(action) {
  const { reject, resolve, data } = action.payload;
  
  try {
    const apiUrl = yield apiRequests.categoryAuth;
    const result = yield apiRequests.deleteRequest(`${apiUrl}/${data}`, {});
    
    if (result) {
      resolve(result)
     
    }
  } catch (err) {
    reject(err);
  }
}
export default function* categoryViewSaga() {
  yield takeLatest(constant.ACTION_GET_CATEGORY, getCategoryList);
  yield takeLatest(constant.ACTION_DELETE_CATEGORY, deleteCategory);
  yield takeLatest(constant.ACTION_CREATE_CATEGORY, createCategory);
  yield takeLatest(constant.ACTION_UPDATE_CATEGORY, updateCategory);

}
