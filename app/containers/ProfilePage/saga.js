// import { take, call, put, select } from 'redux-saga/effects';
// import { take, call, put, select } from 'redux-saga/effects';
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
 import * as _ from 'lodash';
 import * as constant from './constants'
 import * as PageActions from './actions';
import apiRequests from '../App/apiRequest'
export function* getUser(action) {
  const { reject, resolve } = action.payload;
  
  try {
    
    const apiUrl = `https://toystrading.herokuapp.com/v1/auth/users/getOnly`;
    const result = yield apiRequests.getRequest(apiUrl, {});
    
    
    if (result) {
  
      yield put(PageActions.defaultAction('user', result.data.data));
      resolve(result)
     
    }
  } catch (err) {
   
    reject(err);
  }
}
export function* updateUser(action) {
  const { reject, resolve ,data } = action.payload;
  if(data["phone"]){
    data["phone"] = `${data.phone}`;
  }
  
  try {
    const apiUrl = `https://toystrading.herokuapp.com/v1/auth/users/upOnly`;
    const result = yield apiRequests.putRequest(apiUrl, data);
    
    if (result) {
      resolve(result)
     
    }
  } catch (err) {
    reject(err);
  }
}
// Individual exports for testing
export default function* profilePageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(constant.ACTION_GET_USER, getUser);
  yield takeLatest(constant.ACTION_UPDATE_USER, updateUser);

}
