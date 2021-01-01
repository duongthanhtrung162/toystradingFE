/**
 *
 * UserView
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useSnackbar } from 'notistack';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUserView from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as PageActions from './actions';

import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from '../AccountView/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import './UserView.css';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));
export function UserView(props) {
  useInjectReducer({ key: 'userView', reducer });
  useInjectSaga({ key: 'userView', saga });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const classes = useStyles();
  const userList = props.userView.userList;

  const deleteItem = (id) => {
    props.deleteUser(id)
    .then((rs) => {
      props.getUserList();
      enqueueSnackbar('Xóa thành công', {
        variant: 'success',
      });
    }
    )
    .catch((err)=> {
    }
    )
  }
  useEffect(() => {
    (async() => {
     await   props.getUserList();
     //setCategoryList(result.data.data.data); 
    })();
  }, []);
  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results userList={userList} handleDelete={deleteItem}/>
        </Box>
      </Container>
    </Page>
  );
}

UserView.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  userView: makeSelectUserView(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUserList : async () => {
      return new Promise((resolve, reject) => {
        return dispatch(PageActions.getUserList({ resolve, reject }));
      });
  },
  deleteUser : async (data) => {
    return new Promise((resolve, reject) => {
      return dispatch(PageActions.deleteUser({ resolve, reject,data }));
    });
},
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(UserView);
