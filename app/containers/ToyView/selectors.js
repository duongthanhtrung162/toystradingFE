import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the toyView state domain
 */

const selectToyViewDomain = state => state.toyView || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ToyView
 */

const makeSelectToyView = () =>
  createSelector(
    selectToyViewDomain,
    substate => substate,
  );

export default makeSelectToyView;
export { selectToyViewDomain };
