/*
 *
 * DashboardView reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

export const initialState = {
  allUser : {},
  allEcoin : {},
  allToy: {},
  allEcoinTrans: {},
   transStatus: {},
   toyStatus : {},
};

/* eslint-disable default-case, no-param-reassign */
const dashboardViewReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        for (const [key, value] of Object.entries(state)) {
          if(key === action.name){
            state[key] = action.value;
          }
        }
        return {...state};
    }
  });

export default dashboardViewReducer;
