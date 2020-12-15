import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the headerNew state domain
 */

const selectHeaderNewDomain = state => state.headerNew || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HeaderNew
 */

const makeSelectHeaderNew = () =>
  createSelector(
    selectHeaderNewDomain,
    substate => substate,
  );
 

export default makeSelectHeaderNew;
export { selectHeaderNewDomain };
