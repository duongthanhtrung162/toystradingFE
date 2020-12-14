import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dashboardView state domain
 */

const selectDashboardViewDomain = state => state.dashboardView || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DashboardView
 */

const makeSelectDashboardView = () =>
  createSelector(
    selectDashboardViewDomain,
    substate => substate,
  );

export default makeSelectDashboardView;
export { selectDashboardViewDomain };
