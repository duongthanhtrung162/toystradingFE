/**
 *
 * Asynchronously loads the component for UserView
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
