/*
 *
 * UserView actions
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
export function getUserList(data) {
  
  return {
    type: constant.ACTION_GET_USER,
    payload: data

  };
}

export function deleteTag(data) {
  
  return {
    type: constant.ACTION_DELETE_USER,
    payload: data

  };
}