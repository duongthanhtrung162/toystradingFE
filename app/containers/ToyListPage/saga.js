// import { take, call, put, select } from 'redux-saga/effects';
// Individual exports for testing
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
 import * as _ from 'lodash';
 import * as constant from './constants'
 import * as PageActions from './actions';
import apiRequests from '../App/apiRequest';
export function* getListToy(action) {
  
  const { reject, resolve } = action.payload;
  
  try {
    const apiUrl = `https://toystrading.herokuapp.com/v1/auth/get_toy_byid`;
    const result = yield apiRequests.getRequest(apiUrl, {});
    
    if (result) {
      
      yield put(PageActions.defaultAction('listToy', result.data.data));
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
    
    reject(err);
  }
}
// Individual exports for testing
export default function* toyListPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(constant.ACTION_GET_TOY, getListToy);
  yield takeLatest(constant.ACTION_DELETE_TOY, deleteToy);


}
