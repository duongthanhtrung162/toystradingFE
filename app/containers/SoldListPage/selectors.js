import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the soldListPage state domain
 */

const selectSoldListPageDomain = state => state.soldListPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SoldListPage
 */

const makeSelectSoldListPage = () =>
  createSelector(
    selectSoldListPageDomain,
    substate => substate,
  );

export default makeSelectSoldListPage;
export { selectSoldListPageDomain };
