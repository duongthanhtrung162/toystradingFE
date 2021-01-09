/**
 *
 * UserPage
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUserPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Link, useHistory,useLocation, useParams } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';

//component
import ProductItem from '../../components/ProductItem/index';
import MediumText from '../../components/MediumText/index';
import AppWrapper from '../../components/AppWrapper/index';
import * as PageActions from './actions';
import moment from 'moment';

import './UserPage.css';

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);


export function UserPage(props) {
  useInjectReducer({ key: 'userPage', reducer });
  useInjectSaga({ key: 'userPage', saga });
  const {user, listToyUser } = props.userPage;
  let history = useHistory();
  let location = useLocation();
  let { userId } = useParams();

  useEffect(() => {
    (async() => {
      await props.getUser(userId);
      await props.getListToy(userId);

     })();

  }, [location]);
  

  return (
    <div className="user-page-wrapper">
      <AppWrapper >
        <div className="user-page-main">

          <div className="avatar">
            <StyledBadge
              overlap="circle"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              invisible={false}
              variant="dot" // status icon
            >
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" style={{ height: '150px', width: '150px' }} variant="rounded" />
            </StyledBadge>
          </div>
          <Paper variant="outlined" className="user-account" >

            <div className="infor">
              <div className="infor-left">
                Tên tài khoản: <span>{user.userName}</span><br></br>
                {/* Giới tính: <span>Nam</span><br></br> */}
                  Ngày tham gia: <span>{moment(user.createdAt).format('DD/MM/YYYY')}</span><br></br>
              </div>
              <div className="infor-right">
                Trạng thái: <span>{user.activated === 1 ? 'hoạt động' : 'đã khóa'}</span><br></br>
              Đánh giá: <Rating name="read-only" value={user.rate ? user.rate : 0} readOnly precision={0.5} /><br></br>
              </div>
            </div>
          </Paper>
        </div>
        <div variant="contained" className="toy-list" elevation={3}>
          <MediumText mbNumber={10} style={{ textAlign: 'left' }} className="title">
            Sản phẩm
            </MediumText>
          <div className="list">
            {listToyUser.map((item, index) => {
              return (<ProductItem className="home" item={item}  marginLR={10} marginTB={10} />);
            })}
          </div>
        </div>


      </AppWrapper>
    </div>
  );
}

UserPage.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  userPage: makeSelectUserPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUser : async (data) => {
      return new Promise((resolve, reject) => {
        return dispatch(PageActions.getUser({ resolve, reject, data }));
      });
  },
  getListToy : async (data) => {
    return new Promise((resolve, reject) => {
      return dispatch(PageActions.getListToy({ resolve, reject, data }));
    });
},
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(UserPage);
