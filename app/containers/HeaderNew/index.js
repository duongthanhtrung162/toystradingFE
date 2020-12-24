/**
 *
 * HeaderNew
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { getAuthToken } from '../../utils/helper';


import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHeaderNew from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import * as PageActions from './actions';

import './HeaderNew.css';
import SearchBar from 'material-ui-search-bar';
import { PhoneOutlined, BellOutlined, EuroCircleOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import Grid from '@material-ui/core/Grid';
import { Link, useHistory } from 'react-router-dom';
import 'antd/dist/antd.css';
import logo from './logo.jpg';
import Button from '@material-ui/core/Button';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';

import DropdownHeader from '../../components/DropdownHeader/index.js';
import { menuUserLogin, menuUserLogout } from './MenuDropdownHeader';
import NavHeader from '../../components/NavHeader/index';
import AppWrapper from '../../components/AppWrapper/index';
import routesLinks from '../App/routesLinks';

export function HeaderNew(props) {
  useInjectReducer({ key: 'headerNew', reducer });
  useInjectSaga({ key: 'headerNew', saga });
  let history = useHistory();

  const categoryList = props.headerNew.categoryList;
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    
    (async() => {
     await   props.getCategoryList();
     await   props.getTagList();

     //setCategoryList(result.data.data.data); 
    })();
  }, []);

  return (
    <div className="header-wrapper">
      <div className="header-top">
        <AppWrapper className="top-content">
          <ul className="content-list">
            <li className="item">
              <PhoneOutlined />
              <span>12345678</span>
            </li>
            <li className="item">
              <MailOutlined />
              <span>support@tradetoy.com</span>
            </li>
            <li className="item">
              <DropdownHeader className="dropdown-user" menu={getAuthToken() && getAuthToken() != '' ? menuUserLogin : menuUserLogout} placement="bottomRight" onLogout={props.logout}>
                <div >
                  <UserOutlined className="icon-user" /><span>Tài khoản</span>
                </div>
              </DropdownHeader>
            </li>
          </ul>
        </AppWrapper>
      </div>
      <div className="header-middle">
        <AppWrapper>
          <Grid container justify="space-between" spacing={5} >
            <Grid item xs={3} className="logo-header">
              <Link to='/'>
                <img src={logo} alt="react-boilerplate - Logo" />
              </Link>
            </Grid>
            <Grid item xs={6} className="search-input">
              <SearchBar
                onChange={(value) => setSearchKey(value)}
                 onRequestSearch={() => {
                   if(searchKey !== ''){
                    history.push(`${routesLinks.category}?toyName=${searchKey}`);

                   }
                  }}
                placeholder="Tìm kiếm"
                className="search-input-form"
              />
            </Grid>
            <Grid item xs={3} className="noti-header">
              <Button
                variant="contained"
                className="btn noti"
                startIcon={<Badge badgeContent={4}  color="secondary">
                  <NotificationsIcon />    
                </Badge>
                }
              >
                Thông báo
                </Button>
            </Grid>
          </Grid>
        </AppWrapper>
      </div>
      <NavHeader categoryList={categoryList} />
    </div>
  );
}

HeaderNew.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  headerNew: makeSelectHeaderNew(),
});

function mapDispatchToProps(dispatch) {
  return {
    getCategoryList : async () => {
      return new Promise((resolve, reject) => {
        return dispatch(PageActions.getCategoryList({ resolve, reject }));
      });
  },
  getTagList : async () => {
    return new Promise((resolve, reject) => {
      return dispatch(PageActions.getTagList({ resolve, reject }));
    });
}
}
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HeaderNew);
