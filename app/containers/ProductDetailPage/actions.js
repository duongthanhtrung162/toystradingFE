/*
 *
 * ProductDetailPage actions
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
export function getDetailToy(data) {
  
  return {
    type: constant.GET_DETAIL_TOY,
    payload: data
  };
}
export function requestToy(data) {
  
  return {
    type: constant.REQUEST_TOY,
    payload: data
  };
}
export function getToyRelated(data) {
  
  return {
    type: constant.GET_TOY_RELATED,
    payload: data
  };
}
