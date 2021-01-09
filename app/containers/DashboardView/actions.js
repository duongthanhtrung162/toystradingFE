/*
 *
 * DashboardView actions
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
export function getAllUser(data) {
  return {
    type: constant.ACTION_ALL_USER,
    payload: data

  };
}
export function getAllEcoin(data) {
  return {
    type: constant.ACTION_ALL_ECOIN,
    payload: data

  };
}
export function getAllToy(data) {
  return {
    type: constant.ACTION_ALL_TOY,
    payload: data

  };
}
export function getAllEcoinTrans(data) {
  return {
    type: constant.ACTION_ALL_ECOIN_TRANS,
    payload: data

  };
}
export function getTransStatus(data) {
  return {
    type: constant.ACTION_TRANS_STATUS,
    payload: data

  };
}
export function getToyStatus(data) {
  return {
    type: constant.ACTION_TOY_STATUS,
    payload: data

  };
}