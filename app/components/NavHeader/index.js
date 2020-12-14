/**
 *
 * NavHeader
 *
 */

import React from 'react';
import { Menu } from 'antd';
import './NavHeader.css';
// import PropTypes from 'prop-types';22
// import styled from 'styled-components';
import AppWrapper from '../AppWrapper/index';
import DropdownHeaderNav from '../DropdownHeaderNav/index.js';

import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';
import { dropdownNavCategory,dropdownNavAge,dropdownNavSex,dropdownNavCity } from '../Header/MenuDropdownHeader';


function NavHeader({ className,categoryList }) {
  
  return (
    <AppWrapper >
      <Paper className="nav-header">
        <ul className="nav-list">
          <li className="nav-item"><Link to= "/">Đồ chơi mới nhất</Link></li>

          <li className="nav-item">
            <DropdownHeaderNav className="dropdown-nav" menu={categoryList} searchText="category" placement="bottomLeft" arrow>
                  <span>Danh mục</span>
              </DropdownHeaderNav></li>
          <li className="nav-item"><DropdownHeaderNav className="dropdown-nav" menu={dropdownNavSex} searchText="sex" placement="bottomLeft" arrow>
                  <span>Giới tính</span>
              </DropdownHeaderNav></li>
          <li className="nav-item"><DropdownHeaderNav className="dropdown-nav" menu={dropdownNavAge} searchText="age" placement="bottomLeft" arrow>
                  <span>Độ tuổi</span>
              </DropdownHeaderNav></li>
          <li className="nav-item"><DropdownHeaderNav className="dropdown-nav" menu={dropdownNavCity} searchText="city" placement="bottomLeft" arrow>
                  <span>Thành phố</span>
              </DropdownHeaderNav></li>

        </ul>
      </Paper>
    </AppWrapper>

  );
}

NavHeader.propTypes = {};

export default NavHeader;
