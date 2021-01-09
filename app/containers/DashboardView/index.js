/**
 *
 * DashboardView
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectDashboardView from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import * as PageActions from './actions';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from '../AccountView/Page';
import Budget from './Budget';
import LastestOrders from './LastestOrders';
import LastestProducts from './LastestProducts';
import Sales from './Sales';
import TasksProgress from './TasksProgress';
import TotalCustomers from './TotalCustomers';
import TotalProfit from './TotalProfit';
import TrafficByDevice from './TrafficByDevice';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));
export function DashboardView(props) {
  useInjectReducer({ key: 'dashboardView', reducer });
  useInjectSaga({ key: 'dashboardView', saga });
  const {allUser, allEcoin, allToy, allEcoinTrans, transStatus, toyStatus}  = props.dashboardView;
  
  const classes = useStyles();
  useEffect(() => {

    (async() => {
      props.getAllUser();
      props.getAllEcoin();
      props.getAllToy();
      props.getAllEcoinTrans();
      props.getTransStatus();
      props.getToyStatus();

     //setCategoryList(result.data.data.data); 
    })();
  }, []);
  return  (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget countEcoin={allEcoin}/>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalCustomers countUser = {allUser}/>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TasksProgress countToy={allToy}/>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalProfit countEcoinTrans={allEcoinTrans}/>
          </Grid>
          <Grid
            item
            lg={6}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales countToyStatus={toyStatus}/>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice countTransStatus={transStatus} />
          </Grid>
          {/* <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LastestProducts />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LastestOrders />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}

DashboardView.propTypes = {
  
};

const mapStateToProps = createStructuredSelector({
  dashboardView: makeSelectDashboardView(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllUser : async () => {
      return new Promise((resolve, reject) => {
        return dispatch(PageActions.getAllUser({ resolve, reject }));
      });
  },
  getAllEcoin : async () => {
    return new Promise((resolve, reject) => {
      return dispatch(PageActions.getAllEcoin({ resolve, reject }));
    });
},
getAllToy : async () => {
  return new Promise((resolve, reject) => {
    return dispatch(PageActions.getAllToy({ resolve, reject }));
  });
},
getAllEcoinTrans : async () => {
  return new Promise((resolve, reject) => {
    return dispatch(PageActions.getAllEcoinTrans({ resolve, reject }));
  });
},
getTransStatus : async () => {
  return new Promise((resolve, reject) => {
    return dispatch(PageActions.getTransStatus({ resolve, reject }));
  });
},
getToyStatus : async () => {
  return new Promise((resolve, reject) => {
    return dispatch(PageActions.getToyStatus({ resolve, reject }));
  });
},
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DashboardView);
