/*
 *
 * CategoryPage actions
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
export function filterToy(data) {
  return {
    type: constant.FILTER_TOY,
    payload: data
  };
}
export function getTagList(data) {
  
  return {
    type: constant.ACTION_GET_TAG,
    payload: data

  };
}