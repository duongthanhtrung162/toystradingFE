/**
 *
 * TransactionView
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
import makeSelectTransactionView from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Page from '../AccountView/Page';

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
import './TransactionView.css';
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
export function TransactionView(props) {
  useInjectReducer({ key: 'transactionView', reducer });
  useInjectSaga({ key: 'transactionView', saga });
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const listTransactionNew = props.transactionView.newestListTransaction;
  useEffect(() => {
    
    (async() => {
     await props.getNewestTransaction();
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
          <TableCell className="header">Giao dịch</TableCell>
          <TableCell  className="header">Ngày tạo</TableCell>
          <TableCell  className="header">Trạng thái</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {listTransactionNew.map((row) => (
          <Row key={row.id} row={row} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </Page>
  );
}

TransactionView.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  transactionView: makeSelectTransactionView(),
});

function mapDispatchToProps(dispatch) {
  return {
    getNewestTransaction : async () => {
      return new Promise((resolve, reject) => {
        return dispatch(PageActions.getNewestTransaction({ resolve, reject }));
      });
  },  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TransactionView);
