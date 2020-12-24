/*
 *
 * RegisterPage actions
 *
 */

import * as constant from './constants'

export function defaultAction() {
  return {
    type: constant.DEFAULT_ACTION,
  };
}
export function restartPassword(data) {
  
  return {
    type: constant.RESTART_PASSWORD,
    payload: data
  };
}
