/**
 *
 * CustomToolBar
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
function CustomToolBar(props) {
  return (
    <React.Fragment >
      <Tooltip title={"Thêm đồ chơi"}>
        <IconButton onClick={props.onClick}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}

CustomToolBar.propTypes = {};

export default CustomToolBar;
