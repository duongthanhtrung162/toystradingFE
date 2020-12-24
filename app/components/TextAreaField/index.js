/**
 *
 * TextAreaField
 *
 */

import React from 'react';
import ClassNames from 'classnames';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import './TextArea.css';

function TextAreaField(props) {
  return (
    <div className={ClassNames(
      'form-textarea-material',
      props.className,
      props.touched && props.error && 'error',
    )}
    >
      <TextareaAutosize

      style={{width: '100%', height: '100%'}}
      onBlur={props.onBlur}
       onChange={props.onChange}  
           value={props.value}
       className={ClassNames(
        'textarea-input-control')}
        aria-label="minimum height"
        row={props.rowsMin}
        placeholder={props.placeholder} />
    </div>
  );
}

TextAreaField.propTypes = {};

export default TextAreaField;
