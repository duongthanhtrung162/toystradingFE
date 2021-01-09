/*
 *
 * ProductDetailPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

export const initialState = {
  toyRelated : []
};

/* eslint-disable default-case, no-param-reassign */
const productDetailPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        debugger
        state.toyRelated = action.value.data;
        return {...state}
    }
  });

export default productDetailPageReducer;
