import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import ClassNames from 'classnames';
import './DropdownHeader.css';
import history from 'utils/history';
function DropdownHeader({ children, placement, menu, className, arrow, isClick, onLogout }) {
  const menuDropdown = (
    <Menu>
      {
        menu && menu.map((item, key) => {
          return (
            <Menu.Item key={key} className="menu-item">
              {
                item.title === 'Đăng xuất' ? (
                  <Link rel="noopener noreferrer"  onClick={onLogout}>
                    {item.title}
                  </Link>
                )
                  :
                  (
                    <Link rel="noopener noreferrer" to={item.path} >
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

DropdownHeader.propTypes = {};

export default DropdownHeader;
