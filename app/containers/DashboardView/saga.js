// import { take, call, put, select } from 'redux-saga/effects';
// import { take, call, put, select } from 'redux-saga/effects';
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
 import * as _ from 'lodash';
 import * as constant from './constants'
 import * as PageActions from './actions';
import apiRequests from '../App/apiRequest'

export function* getAllUser(action) {
  const { reject, resolve } = action.payload;
  
  try {
    
    const apiUrl = `https://toystrading.herokuapp.com/v1/auth/users/statistic`;
    const result = yield apiRequests.getRequest(apiUrl, {});
    
    if (result) {
      yield put(PageActions.defaultAction('allUser', result.data.data));
      resolve(result)
     
    }
  } catch (err) {
    reject(err);
  }
}
export function* getAllEcoin(action) {
  const { reject, resolve } = action.payload;
  

  try {
    
    const apiUrl = `https://toystrading.herokuapp.com/v1/auth/toy/sumecoin`;
    const result = yield apiRequests.getRequest(apiUrl, {});
    
    if (result) {
      
      yield put(PageActions.defaultAction('allEcoin', result.data.data));
      resolve(result)
     
    }
  } catch (err) {
    reject(err);
  }
}
export function* getAllToy(action) {
  const { reject, resolve } = action.payload;
  

  try {
    
    const apiUrl = `https://toystrading.herokuapp.com/v1/auth/toy/statistic`;
    const result = yield apiRequests.getRequest(apiUrl, {});
    
    if (result) {
      
      yield put(PageActions.defaultAction('allToy', result.data.data));
      resolve(result)
     
    }
  } catch (err) {
    reject(err);
  }
}
export function* getAllEcoinTrans(action) {
  const { reject, resolve } = action.payload;
  try {
    
    const apiUrl = `https://toystrading.herokuapp.com/v1/auth/toy/ecoin_sold`;
    const result = yield apiRequests.getRequest(apiUrl, {});
    
    if (result) {
      
      yield put(PageActions.defaultAction('allEcoinTrans', result.data.data));
      resolve(result)
     
    }
  } catch (err) {
    reject(err);
  }
}
export function* getTransStatus(action) {
  const { reject, resolve } = action.payload;
  try {
    
    const apiUrl = `https://toystrading.herokuapp.com/v1/auth/transaction/ana`;
    const result = yield apiRequests.getRequest(apiUrl, {});
    
    if (result) {
      
      yield put(PageActions.defaultAction('transStatus', result.data.data));
      resolve(result)
     
    }
  } catch (err) {
    reject(err);
  }
}
export function* getToyStatus(action) {
  const { reject, resolve } = action.payload;
  try {
    
    const apiUrl = `https://toystrading.herokuapp.com/v1/auth/toy_ana/getAnalysis`;
    const result = yield apiRequests.getRequest(apiUrl, {});
    
    if (result) {
      
      yield put(PageActions.defaultAction('toyStatus', result.data.data));
      resolve(result)
     
    }
  } catch (err) {
    reject(err);
  }
}
export default function* dashboardViewSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(constant.ACTION_ALL_USER, getAllUser);
  yield takeLatest(constant.ACTION_ALL_ECOIN, getAllEcoin);
  yield takeLatest(constant.ACTION_ALL_TOY, getAllToy);
  yield takeLatest(constant.ACTION_ALL_ECOIN_TRANS, getAllEcoinTrans);
  yield takeLatest(constant.ACTION_TRANS_STATUS, getTransStatus);
  yield takeLatest(constant.ACTION_TOY_STATUS, getToyStatus);

}
