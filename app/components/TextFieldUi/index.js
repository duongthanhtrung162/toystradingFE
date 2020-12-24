/**
 *
 * TextField
 *
 */

import React, { createRef, useEffect, useState } from 'react';
import './TextField.css';
import TextField from '@material-ui/core/TextField';
import ClassNames from 'classnames';
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MenuItem from '@material-ui/core/MenuItem';
import LocalAtmTwoToneIcon from '@material-ui/icons/LocalAtmTwoTone';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';
const checkE = (e) => {
  if (e.keyCode === 69 || e.keyCode === 187 ) {
    e.preventDefault();
  }
};

function TextFieldUi(props) {
  const [values, setValues] = useState({
    showPassword: false
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className={ClassNames(
        'form-input-material',
        props.className,
        props.touched && props.error && 'error',
      )}
    >  {
        props.isSelect ? (
          <TextField
            id="standard-select-currency"
            select
            label={props.label}
            value={props.value}
            onChange={props.onChange}
            variant="outlined"
            name={props.name}
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            className={ClassNames(
              `text-input-control
              ${props.isUploadInput ? 'upload-input' : ''}
              ${props.locked ? 'locked' : ''}
              ${props.uncontrollabled ? 'uncontrollabled' : ''}
              ${props.status ? `status-${nameStatus}` : ''}`,
            )}
          >
            {props.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        ) : (
            <TextField
              //autoComplete={'new-password'}
              InputProps={{ disableUnderline: true }}
              inputProps={props.type === 'number' && props.name ==='ecoin' ? { min: "0", step: "1" } : {}}
              InputLabelProps={props.shrink ? {
                shrink: props.shrink
              } : {}}
              label={props.label}
              disabled={props.disabled}
              defaultValue={props.defaultValue}
              variant="outlined"
              className={ClassNames(
                `text-input-control
            ${props.isUploadInput ? 'upload-input' : ''}
            ${props.locked ? 'locked' : ''}
            ${props.uncontrollabled ? 'uncontrollabled' : ''}
            ${props.status ? `status-${nameStatus}` : ''}`,
              )}
              name={props.name}
              type={props.type === 'password' ? (values.showPassword === true ? 'text' : 'password') : props.type}
              onBlur={props.onBlur}
              error={props.error}
              onChange={props.onChange}
              value={props.value}
              placeholder={props.placeholder}
              disabled={props.disabled}
              min="0"
              onKeyDown={props.type === 'number' ? checkE : props.keyPress}
              InputProps={props.InputProps ? ({
                startAdornment: <InputAdornment position="start">
                  <LocalAtmTwoToneIcon style={{ color: 'yellow' }} />
                </InputAdornment>
              }) : (props.type === 'password' ? {
                endAdornment: <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>,
              } : {})}
            />
          )
      }

      {props.actionText && <div className="form-field-action" onClick={props.action}>{props.actionText}</div>}
      {props.touched && props.errors && <div className="form-field-error">{props.errors}</div>}
      {props.validMessage && <div className="form-field-error">{props.validMessage}</div>}
    </div>
  );
}

TextFieldUi.propTypes = {};

export default TextFieldUi;
