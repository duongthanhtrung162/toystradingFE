// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
 import * as _ from 'lodash';
 import * as constant from './constants'
 import * as PageActions from './actions';
import apiRequests from '../App/apiRequest'
export function* addToy(action) {
  const { reject, resolve } = action.payload;
  
  try {
    const apiUrl = yield apiRequests.addToy;
    const result = yield apiRequests.postRequest(apiUrl, {'toyName': 'sss'});
    
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

}
