/**
 *
 * ModalUi
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import './ModalUi.css';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CloseIcon from '@material-ui/icons/Close';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      backgroundColor: "#fff",
    },
  }),
);

function ModalUi(props) {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={"change-phone-modal"}
      open={props.open}
      onClose={props.onCancelClick}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <div className={classes.paper + " modal-content"}>
          <div className="modal-header">
            {props.title}
            <span aria-hidden="true" onClick={() => {
              props.onCancelClick();
            }}>&times;</span>
          </div>

          <div className="modal-body">
            {props.isModalRate ? (<div>
              <Rating
              size="large"
                name="simple-controlled"
                defaultValue={3}
                onChange={props.onChangeRating
                }
              />
            </div>) : (props.isNotiModal ? (<div>
              <div>Email: {props.email}</div>
              <div>Phone: {props.phone}</div>
            </div>) : props.content)}

            {props.error ? <div className="form-field-error">{props.error}</div> : null}
          </div>
          {
            props.isNotiModal ? (<div></div>) : (
              <div className="modal-footer">
                <div className="action">
                  <Button variant="contained" className="btn-cancel" onClick={() => {
                    props.onCancelClick();
                  }}>Quay lại</Button>
                  <Button variant="contained" className={props.modalDelete ? "btn-delete" : "btn-done"}
                    startIcon={props.modalDelete ? <CloseIcon /> : <ThumbUpAltIcon />}
                    onClick={() => {
                      props.onDoneClick();
                    }}>{props.labelDone}</Button>
                </div>
              </div>
            )
          }

        </div>
      </Fade>
    </Modal>
  );
}

ModalUi.propTypes = {};

export default ModalUi;
