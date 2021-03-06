/*
 *
 * ToyView reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

export const initialState = {
  newestListToy : []

};

/* eslint-disable default-case, no-param-reassign */
const toyViewReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        state.newestListToy = action.value.data;

      return {...state};
    }
  });

export default toyViewReducer;
