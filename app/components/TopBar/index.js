/**
 *
 * TopBar
 *
 */

import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from '../Logo/index';
const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}));

function TopBar({
  className,
  onLogout,
  onMobileNavOpen,
  ...rest
}) {
  const classes = useStyles();
  const [notifications] = useState([]);
  return (
    <AppBar
    className={clsx(classes.root, className)}
    elevation={0}
    {...rest}
  >
    <Toolbar>
      <RouterLink to="/homeAdmin">
        <Logo />
      </RouterLink>
      <Box flexGrow={1} />
      <Hidden mdDown>
        <IconButton color="inherit">
          <Badge
            badgeContent={notifications.length}
            color="primary"
            variant="dot"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit" onClick={onLogout}>
          <InputIcon />
        </IconButton>
      </Hidden>
      <Hidden lgUp>
        <IconButton
          color="inherit"
          onClick={onMobileNavOpen}
        >
          <MenuIcon />
        </IconButton>
      </Hidden>
    </Toolbar>
  </AppBar>
  );
}

TopBar.propTypes = {};

export default TopBar;
