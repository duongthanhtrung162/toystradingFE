/*
 *
 * Login actions
 *
 */

import * as constant from './constants'

export function defaultAction() {
  return {
    type: constant.DEFAULT_ACTION,
  };
}
export function login(data) {
  return {
    type: constant.ACTION_LOGIN,
    payload: data
  };
}
