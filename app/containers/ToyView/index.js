/**
 *
 * ToyView
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectToyView from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Page from '../AccountView/Page';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Row from './Row';
import './ToyView.css';
import { useSnackbar } from 'notistack';
import * as PageActions from './actions';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));


export function ToyView(props) {
  useInjectReducer({ key: 'toyView', reducer });
  useInjectSaga({ key: 'toyView', saga });
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const listToyNew = props.toyView.newestListToy;


  const deleteItem = (id) => {
      
    props.deleteToy(id)
    .then((rs) => {
      props.getNewestToy();
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
     await props.getNewestToy();
     //setCategoryList(result.data.data.data); 
    })();
  }, []);
  return (
    <Page
      className={classes.root}
      title="Customers"
    >
<TableContainer component={Paper}>
      <Table aria-label="collapsible table" className="table-data">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell className="header">Sản phẩm</TableCell>
            <TableCell  className="header">Ngày tạo</TableCell>
            <TableCell  className="header">Trạng thái</TableCell>
            <TableCell align="right" className="header"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listToyNew.map((row) => (
            <Row key={row.toyName} row={row} handleDelete={deleteItem}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Page>
  );
}

ToyView.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  toyView: makeSelectToyView(),
});

function mapDispatchToProps(dispatch) {
  return {
    getNewestToy : async () => {
      return new Promise((resolve, reject) => {
        return dispatch(PageActions.getNewestToy({ resolve, reject }));
      });
  },
  deleteToy : async (data) => {
    return new Promise((resolve, reject) => {
      return dispatch(PageActions.deleteToy({ resolve, reject,data }));
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
)(ToyView);
