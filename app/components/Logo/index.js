/**
 *
 * Logo
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import logoAdmin from './logoAdmin.png';

const Logo = (props) => {
  return (
    <img
    style={{height : 40, borderRadius: '18px'}}
      alt="Logo"
      src={logoAdmin}
      {...props}
    />
  );
};
Logo.propTypes = {};

export default Logo;


