/*
 *
 * UserPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, DEFAULT_ACTION_TOY } from './constants';

export const initialState = {
  user: {},
  listToyUser: []
};

/* eslint-disable default-case, no-param-reassign */
const userPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        state.user = action.value;
        return {...state}
        case DEFAULT_ACTION_TOY:
        state.listToyUser = action.value;
        return {...state}
    }
  });

export default userPageReducer;
