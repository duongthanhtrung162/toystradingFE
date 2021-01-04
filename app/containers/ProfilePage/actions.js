/*
 *
 * ProfilePage actions
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
export function getUser(data) {
 
  return {
    type: constant.ACTION_GET_USER,
    payload: data

  };
}
export function updateUser(data) {
 
  return {
    type: constant.ACTION_UPDATE_USER,
    payload: data

  };
}
