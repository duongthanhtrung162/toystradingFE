// import { take, call, put, select } from 'redux-saga/effects';
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
 import * as _ from 'lodash';
 import * as constant from './constants'
 import * as PageActions from './actions';
import apiRequests from '../App/apiRequest'
// Individual exports for testing
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
export default function* productDetailPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(constant.GET_DETAIL_TOY, getDetailToy);

}
