/**
 *
 * SelectOfTag
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import ClassNames from 'classnames';
import './SelectOfTag.css';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

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
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function SelectOfTag(props) {
  const classes = useStyles();

  return (<div
    className={ClassNames(
      'form-selectoftag-material',
      props.className,
      props.touched && props.error && 'error',
    )}
  > 
   <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={props.options}
      value = {props.value}
      disableCloseOnSelect
      classes={{
        option: classes.option,
      }}
     className={ClassNames(
       'select-field-control'
     )}
     onChange={props.onChange}
     limitTags={3}
      getOptionLabel={(option) => option.value}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.value}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField {...params} variant="outlined"    
         label={props.label}
        placeholder="Favorites" />
      )}
    />

  </div>

  );
}

SelectOfTag.propTypes = {};

export default SelectOfTag;
