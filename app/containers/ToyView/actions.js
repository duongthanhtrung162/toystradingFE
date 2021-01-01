/*
 *
 * ToyView actions
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
export function getNewestToy(data) {
  return {
    type: constant.ACTION_GET_NEWEST_TOY,
    payload: data

  };
}
export function deleteToy(data) {
  
  return {
    type: constant.ACTION_DELETE_TOY,
    payload: data

  };
}