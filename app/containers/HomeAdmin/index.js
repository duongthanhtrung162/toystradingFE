/**
 *
 * HomeAdmin
 *
 */
import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import routesLinks from '../App/routesLinks';
import { Switch, Route,useLocation  } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHomeAdmin from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { makeStyles } from '@material-ui/core';
import NavBar from '../../components/NavBar/index'
import TopBar from '../../components/TopBar/index'
import AccountView from '../AccountView/Loadable';
import DashboardView from '../DashboardView/Loadable';
import UserView from '../UserView/Loadable';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

export function HomeAdmin() {
  useInjectReducer({ key: 'homeAdmin', reducer });
  useInjectSaga({ key: 'homeAdmin', saga });

  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
          <Switch>
          <Route exact  path={`${routesLinks.homeAdmin}/account`} 
             component={AccountView}
            />
            <Route exact  path={`${routesLinks.homeAdmin}/dashboard`} 
             component={DashboardView}
            />
            <Route exact  path={`${routesLinks.homeAdmin}/users`} 
             component={UserView}
            />
          </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

HomeAdmin.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  homeAdmin: makeSelectHomeAdmin(),
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

export default compose(
  withConnect,
  memo,
)(HomeAdmin);
