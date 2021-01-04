// import { take, call, put, select } from 'redux-saga/effects';
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
 import * as _ from 'lodash';
 import * as constant from './constants'
 import * as PageActions from './actions';
import apiRequests from '../App/apiRequest'
// Individual exports for testing
export function* getListBuy(action) {
  const { reject, resolve } = action.payload;
  
  try {
    
    const apiUrl = `https://toystrading.herokuapp.com/v1/auth/transaction/buy`;
    const result = yield apiRequests.getRequest(apiUrl, {});
    
    
    if (result) {
      
      yield put(PageActions.defaultAction('listBuy', result.data));
      resolve(result)
     
    }
  } catch (err) {
    reject(err);
  }
}
export function* upTrans(action) {
  const { reject, resolve,id,data } = action.payload;
  debugger
  try {
    
    const apiUrl = `https://toystrading.herokuapp.com/v1/auth/transaction`;
    const result = yield apiRequests.putRequest(`${apiUrl}/${id}`, data);
    
    
    if (result) {
      
      yield put(PageActions.defaultAction('listBuy', result.data.data));
      resolve(result)
     
    }
  } catch (err) {
    reject(err);
  }
}
export default function* purchaseListPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(constant.ACTION_GET_BUY, getListBuy);
  yield takeLatest(constant.ACTION_UP_TRANS, upTrans);


}
