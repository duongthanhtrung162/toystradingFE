/**
 *
 * AccountView
 *
 */

import React, { memo } from 'react';
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

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

export function AccountView() {
  useInjectReducer({ key: 'accountView', reducer });
  useInjectSaga({ key: 'accountView', saga });
  const classes = useStyles();

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
              <Profile />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <ProfileDetails />
            </Grid>
          </Grid>
        </Container>
      </Page>
    );
  
}

AccountView.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  accountView: makeSelectAccountView(),
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
)(AccountView);
