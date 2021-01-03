/*
 *
 * ToyListPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

export const initialState = {
  listToy : []
};

/* eslint-disable default-case, no-param-reassign */
const toyListPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        state.listToy = action.value;
        
        return {...state};
    
    }
  });

export default toyListPageReducer;
