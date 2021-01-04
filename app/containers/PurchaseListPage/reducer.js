/*
 *
 * PurchaseListPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

export const initialState = {
  listBuy: []
};

/* eslint-disable default-case, no-param-reassign */
const purchaseListPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:

        state.listBuy = action.value.data;

      return {...state};
        
    }
  });

export default purchaseListPageReducer;
