/**
 *
 * UserPageModal
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import './UserPageModal.css';
import ClassNames from 'classnames';



function UserPageModal({
  className
}) {
  return (
       <div
        className={ClassNames(
          `user-page-wrapper`,
          className,
        )} >
          
      </div>
  ) ;
}

UserPageModal.propTypes = {};

export default UserPageModal;
