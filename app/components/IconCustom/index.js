/**
 *
 * IconCustom
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';
const IconComponent = styled.div(props => ({
  fontSize: props.size,
}));

IconComponent.propTypes = {
  size: PropTypes.number,
};
function IconCustom({ size, className, color, marginRight }) {
  return (
    <i
    className={`icon ${className}`}
    style={{
      fontSize: size,
      color,
      marginRight: marginRight,
    }}
  />
  );
}

IconCustom.propTypes = {
  size: PropTypes.number,
  marginRight: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string.isRequired,
};

IconCustom.defaultProps = {
  size: 14,
  marinRight: 0,
  color: '',
  className: '',
};

IconCustom.propTypes = {};

export default IconCustom;
