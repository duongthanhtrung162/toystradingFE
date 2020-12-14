import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the purchaseListPage state domain
 */

const selectPurchaseListPageDomain = state =>
  state.purchaseListPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PurchaseListPage
 */

const makeSelectPurchaseListPage = () =>
  createSelector(
    selectPurchaseListPageDomain,
    substate => substate,
  );

export default makeSelectPurchaseListPage;
export { selectPurchaseListPageDomain };
