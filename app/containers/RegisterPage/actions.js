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
export function register(data) {
  
  return {
    type: constant.ACTION_REGISTER,
    payload: data
  };
}
