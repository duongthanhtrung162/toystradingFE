// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
 import * as _ from 'lodash';
 import * as constant from './constants'
 import * as PageActions from './actions';
import apiRequests from '../App/apiRequest'
export function* addToy(action) {
  const { reject, resolve,data } = action.payload;
  
  try {
    const apiUrl = yield apiRequests.addToy;
    const result = yield apiRequests.postRequest(apiUrl, data);
    
    if (result) {
      
      resolve(result)
     
    }
  } catch (err) {
    
    reject(err);
  }
}
export function* getDetailToy(action) {
  const { reject, resolve, data} = action.payload;
  
  try {
    const apiUrl = yield apiRequests.toy;
    const result = yield apiRequests.getRequest(`${apiUrl}/${data}`, {});
    
    if (result) {
      
      resolve(result)
     
    }
  } catch (err) {
    
    reject(err);
  }
}
export function* updateToy(action) {
  const { reject, resolve, data,id} = action.payload;
  
  try {
    const apiUrl = `https://toystrading.herokuapp.com/v1/auth/toy`;
    const result = yield apiRequests.putRequest(`${apiUrl}/${id}`, data);
    
    if (result) {
      
      resolve(result)
     
    }
  } catch (err) {
    
    reject(err);
  }
}
export default function* toyPageEditSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(constant.ADD_TOY, addToy);
  yield takeLatest(constant.GET_DETAIL_TOY, getDetailToy);
  yield takeLatest(constant.UPDATE_TOY, updateToy);

}
