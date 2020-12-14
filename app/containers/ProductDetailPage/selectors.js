import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the productDetailPage state domain
 */

const selectProductDetailPageDomain = state =>
  state.productDetailPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProductDetailPage
 */

const makeSelectProductDetailPage = () =>
  createSelector(
    selectProductDetailPageDomain,
    substate => substate,
  );

export default makeSelectProductDetailPage;
export { selectProductDetailPageDomain };
