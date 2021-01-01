// import { take, call, put, select } from 'redux-saga/effects';
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
    
    const apiUrl = `https://toystrading.herokuapp.com/v1/toy`;
    const result = yield apiRequests.getRequest(apiUrl, {});
    
    
    if (result) {
      yield put(PageActions.defaultAction('newestListToy', result.data.data));
      resolve(result)
     
    }
  } catch (err) {
    reject(err);
  }
}
export function* deleteToy(action) {
  const { reject, resolve, data } = action.payload;
  
  try {
    const apiUrl = `https://toystrading.herokuapp.com/v1/auth/toy`;
    const result = yield apiRequests.deleteRequest(`${apiUrl}/${data}`, {});
    
    if (result) {
      resolve(result)
     
    }
  } catch (err) {
    deubugger
    reject(err);
  }
}
export default function* toyViewSaga() {
  yield takeLatest(constant.ACTION_GET_NEWEST_TOY, getNewestToy);
  yield takeLatest(constant.ACTION_DELETE_TOY, deleteToy);

}
