import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the accountView state domain
 */

const selectAccountViewDomain = state => state.accountView || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AccountView
 */

const makeSelectAccountView = () =>
  createSelector(
    selectAccountViewDomain,
    substate => substate,
  );

export default makeSelectAccountView;
export { selectAccountViewDomain };
