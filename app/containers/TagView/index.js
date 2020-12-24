/**
 *
 * TagView
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectTagView from './selectors';
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
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

export function TagView(props) {
  useInjectReducer({ key: 'tagView', reducer });
  useInjectSaga({ key: 'tagView', saga });
   
  const classes = useStyles();
  const tagList = props.tagView.tagList;
  
  const deleteItem = (id) => {
    props.deleteTag(id)
    .then((rs) => {
      props.getTagList();
    }

    )
    .catch((err)=> {
      
    }

    )
  }
  const editItem = (id) => {
    debugger
  }
  useEffect(() => {
    
    (async() => {
     await   props.getTagList();

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
          <Results tagList={tagList} handleDelete = {deleteItem} 
          handleEdit = {editItem}/>
        </Box>
      </Container>
    </Page>
  );
}

TagView.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  tagView: makeSelectTagView(),
});

function mapDispatchToProps(dispatch) {
  return {
    getTagList : async () => {
      return new Promise((resolve, reject) => {
        return dispatch(PageActions.getTagList({ resolve, reject }));
      });
  },
  deleteTag : async (data) => {
    return new Promise((resolve, reject) => {
      return dispatch(PageActions.deleteTag({ resolve, reject,data }));
    });
},
  }
  };


const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TagView);
