import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tagView state domain
 */

const selectTagViewDomain = state => state.tagView || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TagView
 */

const makeSelectTagView = () =>
  createSelector(
    selectTagViewDomain,
    substate => substate,
  );

export default makeSelectTagView;
export { selectTagViewDomain };
