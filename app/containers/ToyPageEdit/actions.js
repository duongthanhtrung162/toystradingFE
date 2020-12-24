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
export function addToy(data) {
  
  return {
    type: constant.ADD_TOY,
    payload: data

  };
}
