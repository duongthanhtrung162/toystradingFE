/**
 *
 * UserProfilePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Switch, Route,useLocation  } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUserProfilePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import routesLinks from '../App/routesLinks';

//component
import './UserProfilePage.css';
import AppWrapper from '../../components/AppWrapper/index';
import MenuUserProfilePage from '../../components/MenuUserProfilePage/index';
import ProfilePage from '../ProfilePage/Loadable';
import ToyListPage from '../ToyListPage/Loadable';
import PurchaseListPage from '../PurchaseListPage/Loadable';
import SoldListPage from '../SoldListPage/Loadable';


export function UserProfilePage() {
  useInjectReducer({ key: 'userProfilePage', reducer });
  useInjectSaga({ key: 'userProfilePage', saga });

  return (
    <div className="user-profile-page">
      <AppWrapper className="user-profile-wrapper">
        <div className="left-column-section">
          <MenuUserProfilePage />
        </div>
        <div className="right-column-section">
          <Switch>
            <Route exact  path={`${routesLinks.userProfile}/profile`} 
             component={ProfilePage}
            />
            <Route exact  path={`${routesLinks.userProfile}/toy`} 
             component={ToyListPage}
            />
            <Route exact  path={`${routesLinks.userProfile}/purchased`} 
             component={PurchaseListPage}
            />
            <Route exact  path={`${routesLinks.userProfile}/sold`} 
             component={SoldListPage}
            />
            </Switch>
        </div>
      </AppWrapper>

    </div>
  );
}

UserProfilePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userProfilePage: makeSelectUserProfilePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(UserProfilePage);
