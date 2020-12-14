/**
 *
 * MediumText
 *
 */

import ClassNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './LargeText.css';

const classWrapper = 'large-text';

function LargeText({ children, isInline, className, mbNumber, style }) {
  return (
    <div
      style={{
        ...style,
        marginBottom: mbNumber,
      }}
      className={ClassNames(
        `${classWrapper}-wrapper`,
        className,
        isInline && 'd-inline-block',
      )}
    >
      {children}
    </div>
  );
}

LargeText.propTypes = {
  children: PropTypes.any,
  isInline: PropTypes.bool,
  className: PropTypes.string,
  mbNumber: PropTypes.number,
  style: PropTypes.any,
};

LargeText.defaultProps = {
  isInline: false,
  className: '',
  mbNumber: 50,
};

export default LargeText;
