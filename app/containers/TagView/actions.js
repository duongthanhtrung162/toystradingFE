/*
 *
 * TagView actions
 *
 */

import * as constant from './constants'

export function defaultAction(name, value) {
  
  return {
    type: constant.DEFAULT_ACTION_TAG,
    name,
    value
  };
}
export function getTagList(data) {
  
  return {
    type: constant.ACTION_GET_TAG,
    payload: data

  };
}
export function deleteTag(data) {
  
  return {
    type: constant.ACTION_DELETE_TAG,
    payload: data

  };
}
export function createTag(data) {
  
  return {
    type: constant.ACTION_CREATE_TAG,
    payload: data

  };
}
export function updateTag(data) {
  
  return {
    type: constant.ACTION_UPDATE_TAG,
    payload: data

  };
}