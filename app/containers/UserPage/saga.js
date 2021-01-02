// import { take, call, put, select } from 'redux-saga/effects';
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
 import * as _ from 'lodash';
 import * as constant from './constants'
 import * as PageActions from './actions';
import apiRequests from '../App/apiRequest'
// Individual exports for testing
export function* getUser(action) {
  const { reject, resolve, data} = action.payload;
  
  try {
    const apiUrl = yield apiRequests.user;
    const result = yield apiRequests.getRequest(`${apiUrl}/${data}`, {});
    
    if (result) {
      yield put(PageActions.defaultAction('user', result.data.data));
      resolve(result)
     
    }
  } catch (err) {
    
    reject(err);
  }
}
export function* getListToy(action) {
  const { reject, resolve, data} = action.payload;
  
  try {
    const apiUrl = `https://toystrading.herokuapp.com/v1/toy_by_user`;
    const result = yield apiRequests.getRequest(`${apiUrl}/${data}`, {});
    
    if (result) {
      yield put(PageActions.defaultActionToy('listToyUser', result.data.data));
      resolve(result)
     
    }
  } catch (err) {
    
    reject(err);
  }
}
export default function* userPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(constant.GET_USER, getUser);
  yield takeLatest(constant.GET_LIST_TOY, getListToy);


}
