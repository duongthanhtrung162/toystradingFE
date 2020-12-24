import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import ClassNames from 'classnames';
import './DropdownHeader.css';
import history from 'utils/history';
import routesLinks from '../../containers/App/routesLinks';
function DropdownHeaderNav({ children, placement, menu, className, arrow, isClick,searchText }) {
  const menuDropdown = (
    <Menu>
      {
        menu && menu.map((item, key) => {
          return (
            <Menu.Item key={key} className="menu-item">
              {
                searchText === "category" ?
                (
                  <Link rel="noopener noreferrer" to={`${routesLinks.category}?${searchText}=${item.id}`} 
                  >
                  {item.value}
                </Link> 
                )
                  :
                  (
                    <Link rel="noopener noreferrer" to={`${routesLinks.category}?${searchText}=${item.value}`} >
                    {item.title}
                  </Link> 
                  )
                    
              }

            </Menu.Item>
          )
        })
      }

    </Menu>
  );
  return (
    <Dropdown overlay={menuDropdown} arrow={arrow ? true : false} placement={placement} className={ClassNames(
      `dropdown-list`,
      className,
    )}
      trigger={isClick ? ['click'] : ['hover']}
    >
      {children}
    </Dropdown>
  );
}

DropdownHeaderNav.propTypes = {};

export default DropdownHeaderNav;
