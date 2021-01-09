// import { take, call, put, select } from 'redux-saga/effects';
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
 import * as _ from 'lodash';
 import * as constant from './constants'
 import * as PageActions from './actions';
import apiRequests from '../App/apiRequest'
// Individual exports for testing
export function* getListSold(action) {
  const { reject, resolve } = action.payload;
  
  try {
    const apiUrl = `https://toystrading.herokuapp.com/v1/auth/transaction/sell`;
    const result = yield apiRequests.getRequest(apiUrl, {});
    if (result) {
      
      yield put(PageActions.defaultAction('listSold', result.data.data));
      resolve(result)
     
    }
  } catch (err) {
    reject(err);
  }
}
export function* upTrans(action) {
  const { reject, resolve,id,data } = action.payload;
  
  try {
    
    const apiUrl = `https://toystrading.herokuapp.com/v1/auth/transaction`;
    const result = yield apiRequests.putRequest(`${apiUrl}/${id}`, data);
    
    
    if (result) {
      
     // yield put(PageActions.defaultAction('listBuy', result.data.data));
      resolve(result)
     
    }
  } catch (err) {
    reject(err);
  }
}
export function* upTransRate(action) {
  const { reject, resolve,data } = action.payload;
  
  try {
     

    const apiUrl = `https://toystrading.herokuapp.com/v1/auth/transrate`;
    const result = yield apiRequests.postRequest(apiUrl, data);
    
    
    if (result) {
      
      resolve(result)
     
    }
  } catch (err) {
    reject(err);
  }
}
export default function* soldListPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(constant.ACTION_GET_SOLD, getListSold);
  yield takeLatest(constant.ACTION_UP_TRANS, upTrans);
  yield takeLatest(constant.ACTION_UP_TRANS_RATE, upTransRate);

}
