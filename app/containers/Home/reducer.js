/*
 *
 * Home reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, ACTION_GET_CATEGORY } from './constants';

export const initialState = {
  newestListToy : []
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state,  draft  => {
    switch (action.type) {
      case DEFAULT_ACTION:       
      state.newestListToy = action.value.data;

      return {...state};
    }
  });

export default homeReducer;
