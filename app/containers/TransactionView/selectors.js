import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the transactionView state domain
 */

const selectTransactionViewDomain = state =>
  state.transactionView || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TransactionView
 */

const makeSelectTransactionView = () =>
  createSelector(
    selectTransactionViewDomain,
    substate => substate,
  );

export default makeSelectTransactionView;
export { selectTransactionViewDomain };
