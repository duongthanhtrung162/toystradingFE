/*
 *
 * UserPage actions
 *
 */

import * as constant  from './constants';

export function defaultAction(name, value) {
  return {
    type: constant.DEFAULT_ACTION,
    name,
    value
  };
}
export function defaultActionToy(name, value) {
  return {
    type: constant.DEFAULT_ACTION_TOY,
    name,
    value
  };
}
export function getUser(data) {
  
  return {
    type: constant.GET_USER,
    payload: data
  };
}
export function getListToy(data) {
  
  return {
    type: constant.GET_LIST_TOY,
    payload: data
  };
}