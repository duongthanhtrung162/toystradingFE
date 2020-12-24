/*
 *
 * TagView reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION,DEFAULT_ACTION_TAG } from './constants';

export const initialState = {
  tagList : []

};

/* eslint-disable default-case, no-param-reassign */
const tagViewReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION_TAG:
        state.tagList = action.value.data;
        return {...state};
    }
    
  });

export default tagViewReducer;
