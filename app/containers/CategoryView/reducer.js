/*
 *
 * CategoryView reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

export const initialState = {
  categoryList : []
};

/* eslint-disable default-case, no-param-reassign */
const categoryViewReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        state.categoryList = action.value.data;
        return {...state};
    }
  });

export default categoryViewReducer;
