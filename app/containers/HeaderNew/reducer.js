/*
 *
 * HeaderNew reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION ,DEFAULT_ACTION_TAG} from './constants';

export const initialState = {
  categoryList : [],
  tagList : []

};

/* eslint-disable default-case, no-param-reassign */
const headerNewReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        state.categoryList = action.value.data;
        return {...state};
     case DEFAULT_ACTION_TAG:
        state.tagList = action.value.data;
        return {...state};
    }
  });

export default headerNewReducer;
