/*
 *
 * UserView reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

export const initialState = {
  userList : []
};

/* eslint-disable default-case, no-param-reassign */
const userViewReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        
        state.userList = action.value;
        
        return {...state};
    }
  });

export default userViewReducer;
