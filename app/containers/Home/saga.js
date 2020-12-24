// import { take, call, put, select } from 'redux-saga/effects';
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
 import * as _ from 'lodash';
 import * as constant from './constants'
 import * as PageActions from './actions';
import apiRequests from '../App/apiRequest'
// Individual exports for testing

export function* getNewestToy(action) {
  const { reject, resolve } = action.payload;
  
  try {
    
    const apiUrl = `https://toystrading.herokuapp.com/v1/get_new_toy`;
    const result = yield apiRequests.getRequest(apiUrl, {});
    
    
    if (result) {
      yield put(PageActions.defaultAction('categoryList', result.data));
      resolve(result)
     
    }
  } catch (err) {
    reject(err);
  }
}
export default function* homeSaga() {
  yield takeLatest(constant.ACTION_GET_NEWEST_TOY, getNewestToy);

}
