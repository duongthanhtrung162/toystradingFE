/*
 *
 * TransactionView reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

export const initialState = {
  newestListTransaction : []
};

/* eslint-disable default-case, no-param-reassign */
const transactionViewReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        state.newestListTransaction = action.value.data;

      return {...state};
        
    }
  });

export default transactionViewReducer;
