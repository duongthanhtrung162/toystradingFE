/*
 *
 * HeaderNew actions
 *
 */

import * as constant from './constants'

export function defaultAction(name, value) {
  return {
    type: constant.DEFAULT_ACTION,
    name,
    value
  };
}
export function getDetailToy(data) {
  
  return {
    type: constant.GET_DETAIL_TOY,
    payload: data
  };
}
export function addToy(data) {
  
  return {
    type: constant.ADD_TOY,
    payload: data

  };
}
export function updateToy(data) {
  
  return {
    type: constant.UPDATE_TOY,
    payload: data

  };
}
