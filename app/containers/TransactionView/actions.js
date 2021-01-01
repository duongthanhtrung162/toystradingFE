/*
 *
 * TransactionView actions
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
export function getNewestTransaction(data) {
  return {
    type: constant.ACTION_GET_NEWEST_TRANSACTION,
    payload: data

  };
}
