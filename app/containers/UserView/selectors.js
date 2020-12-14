import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userView state domain
 */

const selectUserViewDomain = state => state.userView || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserView
 */

const makeSelectUserView = () =>
  createSelector(
    selectUserViewDomain,
    substate => substate,
  );

export default makeSelectUserView;
export { selectUserViewDomain };
