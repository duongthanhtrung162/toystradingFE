import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the toyPageEdit state domain
 */

const selectToyPageEditDomain = state => state.toyPageEdit || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ToyPageEdit
 */

const makeSelectToyPageEdit = () =>
  createSelector(
    selectToyPageEditDomain,
    substate => substate,
  );

export default makeSelectToyPageEdit;
export { selectToyPageEditDomain };
