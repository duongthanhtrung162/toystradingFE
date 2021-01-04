/*
 *
 * SoldListPage actions
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
export function getListSold(data) {
  return {
    type: constant.ACTION_GET_SOLD,
    payload: data

  };
}
export function updateTrans(data) {
  return {
    type: constant.ACTION_UP_TRANS,
    payload: data

  };
}
