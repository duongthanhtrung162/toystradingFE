/**
 *
 * AccountView
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAccountView from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from './Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import { useSnackbar } from 'notistack';
import * as PageActions from './actions'
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

export function AccountView(props) {
  useInjectReducer({ key: 'accountView', reducer });
  useInjectSaga({ key: 'accountView', saga });
  
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const user = props.accountView.user;

  const [updateInfor, setupdateInfor] = useState(false)

  const changeUpdate = () =>{
    const newValue = !updateInfor;
    setupdateInfor(newValue);
  }
  useEffect(() => {
    
    (async() => {
     await props.getUser();
     //setCategoryList(result.data.data.data); 
    })();
  }, [updateInfor]);
  return (
      <Page
        className={classes.root}
        title="Account"
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <Profile user={user} />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <ProfileDetails user={user} updateUser={props.updateUser} updateInforUser={changeUpdate}/>
            </Grid>
          </Grid>
        </Container>
      </Page>
    );
  
}

AccountView.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  accountView: makeSelectAccountView(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUser : async () => {
      return new Promise((resolve, reject) => {
        return dispatch(PageActions.getUser({ resolve, reject }));
      });
  },
  updateUser : async (data) => {
    return new Promise((resolve, reject) => {
      return dispatch(PageActions.updateUser({ resolve, reject,data }));
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
)(AccountView);
