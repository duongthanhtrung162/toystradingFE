/**
 *
 * AppWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function AppWrapper({
  className,
  marginBottom,
  children,
}) {
  return ( <Div
    className={className }
    marginBottom={marginBottom }
  >
    {children}
  </Div>);
}

AppWrapper.propTypes = {
  className: PropTypes.string,
  marginBottom: PropTypes.number,
  children: PropTypes.any,
};
AppWrapper.defaultProps = {
  marginBottom: 0,
  className: '',
};
const Div = styled.div`
  width:calc(1142px) ;
  margin: 0 auto;
  margin-bottom: ${(props) => {
    return props.marginBottom;
  }}px;

  position: relative;
`;
export default AppWrapper;
