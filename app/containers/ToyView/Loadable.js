/**
 *
 * Asynchronously loads the component for ToyView
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
