/*
 *
 * CategoryPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

export const initialState = {
  tagList : []
};

/* eslint-disable default-case, no-param-reassign */
const categoryPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        state.tagList = action.value.data;
        return {...state};
    }
  });

export default categoryPageReducer;
