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
export function getCategoryList(data) {
  return {
    type: constant.ACTION_GET_CATEGORY,
    payload: data

  };
}