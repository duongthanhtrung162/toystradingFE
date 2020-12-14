/*
 *
 * Login reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION,ACTION_LOGIN } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case ACTION_LOGIN:
        break;
      default:
        return state;
    }
  });

export default loginReducer;
