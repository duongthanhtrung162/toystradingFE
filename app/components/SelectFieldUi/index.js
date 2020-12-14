/**
 *
 * SelectFieldUi
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import './SelectFieldUi.css';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ClassNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  option: {
    fontSize: 13,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

function SelectFieldUi(props) {
  const classes = useStyles();

  return (
    <div
      className={ClassNames(
        'form-select-material',
        props.className,
        props.touched && props.error && 'error',
      )}
    >   <Autocomplete
        id="form-select"
        //style={{ width: 300 }}
        getOptionLabel={(option) => option.label}
        options={props.options}
        classes={{
          option: classes.option,
        }}
       className={ClassNames(
         'select-field-control'
       )}
        autoHighlight
        onChange={props.onChange}
        // onChange={(event, newValue) => {
        //   setValue(newValue);
        // }}
        renderOption={(option) => (
          <React.Fragment>
            
            {option.label} 
          </React.Fragment>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={props.label}
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
      />

      {props.actionText && <div className="form-field-action" onClick={props.action}>{props.actionText}</div>}
      {props.touched && props.error && <div className="form-field-error">{props.error}</div>}
      {props.validMessage && <div className="form-field-error">{props.validMessage}</div>}
    </div>
  );
}

SelectFieldUi.propTypes = {};

export default SelectFieldUi;
