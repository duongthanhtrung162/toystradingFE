/*
 *
 * AccountView reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

export const initialState = {
  user : {}
};

/* eslint-disable default-case, no-param-reassign */
const accountViewReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        state.user = action.value;
        return {...state}
    }
  });

export default accountViewReducer;
