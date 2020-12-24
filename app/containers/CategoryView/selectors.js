import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the categoryView state domain
 */

const selectCategoryViewDomain = state => state.categoryView || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CategoryView
 */

const makeSelectCategoryView = () =>
  createSelector(
    selectCategoryViewDomain,
    substate => substate,
  );

export default makeSelectCategoryView;
export { selectCategoryViewDomain };
