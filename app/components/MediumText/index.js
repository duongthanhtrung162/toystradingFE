/**
 *
 * MediumText
 *
 */

import ClassNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './MediumText.css';

const classWrapper = 'medium-text';

function MediumText({ children, isInline, className, mbNumber, style }) {
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

MediumText.propTypes = {
  children: PropTypes.any,
  isInline: PropTypes.bool,
  className: PropTypes.string,
  mbNumber: PropTypes.number,
  style: PropTypes.any,
};

MediumText.defaultProps = {
  isInline: false,
  className: '',
  mbNumber: 50,
};

export default MediumText;
