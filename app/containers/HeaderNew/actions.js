/*
 *
 * HeaderNew actions
 *
 */

import * as constant from './constants'

export function defaultAction(name, value) {
  if(name === 'tagList'){
    return {
      type: constant.DEFAULT_ACTION_TAG,
      name,
      value
    };
  }else {
    
    return {
      type: constant.DEFAULT_ACTION,
      name,
      value
    };
  }
  
}
export function getCategoryList(data) {
  
  return {
    type: constant.ACTION_GET_CATEGORY,
    payload: data

  };
}
export function getTagList(data) {
  return {
    type: constant.ACTION_GET_TAG,
    payload: data

  };
}
