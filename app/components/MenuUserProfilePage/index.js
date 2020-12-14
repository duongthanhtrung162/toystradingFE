/**
 *
 * MenuUserProfilePage
 *
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import routesLinks from '../../containers/App/routesLinks';
import { LineChartOutlined, PercentageOutlined, CodeSandboxOutlined, ShoppingOutlined, SmileTwoTone } from '@ant-design/icons';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import './MenuUserProfilePage.css';

function MenuUserProfilePage() {
  const activeStyle = {
    color: '#0099cd',
    fontWeight: 600,
  };

  return (
    <div className="menu-profile-wrapper">
      <div className="header">
        <NavLink to={`${routesLinks.userProfile}/main`} className="menu-item" activeStyle={activeStyle}> 
          <LineChartOutlined />
          <span>Thống kê</span>
        </NavLink>
      </div>
      <div className="menu-list">
        <NavLink to={`${routesLinks.userProfile}/toy`} activeStyle={activeStyle} className="menu-item">
          <CodeSandboxOutlined />
          <span>Đồ chơi</span>
          <span className="count">2</span>
        </NavLink>
        <NavLink to={`${routesLinks.userProfile}/sold`} activeStyle={activeStyle} className="menu-item">
          <PercentageOutlined />
          <span>Đã bán</span>
          <span className="count">2</span>
        </NavLink>
        <NavLink to={`${routesLinks.userProfile}/purchased`} activeStyle={activeStyle} className="menu-item">
          <ShoppingOutlined />
          <span>Đã mua</span>
          <span className="count">2</span>
        </NavLink>
        <NavLink to={`${routesLinks.userProfile}/profile`} activeStyle={activeStyle} className="menu-item">
          <SmileTwoTone />
          <span>Cá nhân</span>
        </NavLink>
      </div>
    </div>
  );
}

MenuUserProfilePage.propTypes = {};

export default MenuUserProfilePage;
