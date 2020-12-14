import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the toyListPage state domain
 */

const selectToyListPageDomain = state => state.toyListPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ToyListPage
 */

const makeSelectToyListPage = () =>
  createSelector(
    selectToyListPageDomain,
    substate => substate,
  );

export default makeSelectToyListPage;
export { selectToyListPageDomain };
