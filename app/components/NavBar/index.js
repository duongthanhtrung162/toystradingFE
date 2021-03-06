/**
 *
 * NavBar
 *
 */
import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  List as ListIcon,
  Menu as MenuIcon,
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from '../NavItem/index';
import routesLinks from '../../containers/App/routesLinks'
// import styled from 'styled-components';
const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Admin user'
};

const items = [
  {
    href: `${routesLinks.homeAdmin}/dashboard`,
    icon: BarChartIcon,
    title: 'Thống kê'
  },
  {
    href: `${routesLinks.homeAdmin}/users`,
    icon: UsersIcon,
    title: 'Tài khoản'
  },
  {
    href: `${routesLinks.homeAdmin}/categories`,
    icon: ShoppingBagIcon,
    title: 'Danh mục'
  },
  {
    href: `${routesLinks.homeAdmin}/tags`,
    icon: SettingsIcon,
    title: 'Tags'
  },
  {
    href: `${routesLinks.homeAdmin}/toys`,
    icon: ListIcon,
    title: 'Đồ chơi'
  },
  {
    href: `${routesLinks.homeAdmin}/transactions`,
    icon: MenuIcon,
    title: 'Giao dịch'
  }
];
const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));
function NavBar({ onMobileClose, openMobile }) {
  const classes = useStyles();
  const location = useLocation();

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to={`${routesLinks.homeAdmin}/account`}
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          Admin
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
     
        
     
    </Box>
  );

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  return (
    <>
    <Hidden lgUp>
      <Drawer
        anchor="left"
        classes={{ paper: classes.mobileDrawer }}
        onClose={onMobileClose}
        open={openMobile}
        variant="temporary"
      >
        {content}
      </Drawer>
    </Hidden>
    <Hidden mdDown>
      <Drawer
        anchor="left"
        classes={{ paper: classes.desktopDrawer }}
        open
        variant="persistent"
      >
        {content}
      </Drawer>
    </Hidden>
  </>
  );
}

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};
export default NavBar;
