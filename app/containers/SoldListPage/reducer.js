/*
 *
 * SoldListPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

export const initialState = {
  listSold: []
};

/* eslint-disable default-case, no-param-reassign */
const soldListPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
  
        state.listSold = action.value;

      return {...state};
    }
  });

export default soldListPageReducer;
