/*
 *
 * CategoryView actions
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
export function getCategoryList(data) {
  
  return {
    type: constant.ACTION_GET_CATEGORY,
    payload: data

  };
}
export function deleteCategory(data) {
  
  return {
    type: constant.ACTION_DELETE_CATEGORY,
    payload: data

  };
}
export function createCategory(data) {
  
  return {
    type: constant.ACTION_CREATE_CATEGORY,
    payload: data

  };
}
export function updateCategory(data) {
  
  return {
    type: constant.ACTION_UPDATE_CATEGORY,
    payload: data

  };
}
