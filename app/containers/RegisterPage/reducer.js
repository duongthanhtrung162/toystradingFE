/*
 *
 * RegisterPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION,ACTION_REGISTER } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const registerPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
        default:
        return state;
    }
  });

export default registerPageReducer;
