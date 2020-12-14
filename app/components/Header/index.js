import React, {useEffect} from 'react';
import { Row, Col } from 'antd';
import SearchBar from 'material-ui-search-bar';
import { PhoneOutlined, BellOutlined, EuroCircleOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import logo from './logo.jpg';
import './header.css';
import Button from '@material-ui/core/Button';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import { getAuthToken } from '../../utils/helper';
import { useDispatch, useSelector } from 'react-redux';

//component
import DropdownHeader from '../DropdownHeader/index.js';
import { menuUserLogin, menuUserLogout } from './MenuDropdownHeader';
import NavHeader from '../NavHeader/index';
import AppWrapper from '../AppWrapper/index';
import { makeSelectCategory } from '../../containers/Home/selectors';
import * as PageActions from '../../containers/Home/actions';

function Header(props) {
  // const stateSelector = createStructuredSelector({
  //   selectHome: makeSelectCategory(),
  // });
  const dispatch = useDispatch();

  const homeData = useSelector(makeSelectCategory());
  const {categoryList} = homeData;

const getCategoryList = async () => {
  return new Promise((resolve, reject) => {
    return dispatch(PageActions.getCategoryList({ resolve, reject }));
  });
}
useEffect(() => {
  debugger
  getCategoryList();
  
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
                // onChange={() => console.log('onChange')}
                // onRequestSearch={() => console.log('onRequestSearch')}
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

export default Header;
