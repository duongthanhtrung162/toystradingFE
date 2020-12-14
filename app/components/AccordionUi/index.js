/**
 *
 * AccordionUi
 *
 */

import React,  {useState} from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import './AccordionUi.css';
import ClassNames from 'classnames';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocalAtmTwoToneIcon from '@material-ui/icons/LocalAtmTwoTone';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import GradeIcon from '@material-ui/icons/Grade';

import ModalUi from '../ModalUi/index';

function AccordionUi(props) {
  const [openModalCancel,setOpenModalCancel] = useState(false);
  const [openModalRate,setOpenModalRate] = useState(false);
  const [openModalAccept,setOpenModalAccept] = useState(false);
  const [openModalContact,setOpenModalContact] = useState(false);

  return (
    <div
      className={ClassNames(
        'form-accordion-material',
        props.className,
        props.touched && props.error && 'error',
      )}
    >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="offer-id wrapper">
            <span>ID</span>
            <div className={'id'}>123456</div>
          </div>
          <div className="offer-date wrapper">
            <span>Ngày gửi</span>
            <div className="date">12-12-2000</div>
          </div>
          <div className="offer-status wrapper">

            <div className={`status ${3 > 1 ? 'request' : 'cancel'}`}>
              <span className="icon-status"></span>
              đang yêu cầu
              </div>
          </div>

        </AccordionSummary>
        <AccordionDetails>
          <div className="header">
            <div className="title">
              Đồ chơi
            </div>
            <div className="sub-title">
              Ecoin
           </div>
          </div>
          <div className="product-infor">
            <div className="infor">
              <img
                src='https://picsum.photos/id/1019/250/150/'
              />
              <div className="name">
                <Link to="/register">Tên đồ chơi</Link>
              </div>
            </div>
            <div className="price">
              <LocalAtmTwoToneIcon style={{ color: 'yellow', marginRight: '5px' }} />
              300
            </div>
          </div>
          <div className="header">
            <div className="title">
              Đối tác
            </div>
          </div>
          <div className="person-infor">
            <div className="infor">
              <img
                src='https://picsum.photos/id/1019/250/150/'
              />
              <div className="name">
                <Link to="/register">Tên người bán</Link>
              </div>
            </div>

          </div>
          <div className="header btn">
            <Button
              className="btn cancel"
              variant="contained"
            onClick={() => setOpenModalCancel(true)}
            >
              Hủy giao dịch
             </Button>
            <Button
              className="btn accept"
              variant="contained"
              startIcon={<ThumbUpAltIcon />}
            onClick={() => setOpenModalAccept(true)}
            >
              Đồng ý trao đổi
             </Button>
            <Button
              className="btn contact"
              variant="contained"
              startIcon={<PermContactCalendarIcon />}
            onClick={() => setOpenModalContact(true)}
            >
              Thông tin liên hệ
             </Button>
            <Button
              className="btn rate"
              variant="contained"
              startIcon={<GradeIcon />}
            onClick={() => setOpenModalRate(true)}
            >
              Đánh giá
             </Button>

          </div>
        </AccordionDetails>
      </Accordion>

      <ModalUi open={openModalCancel}
      onCancelClick={()=> setOpenModalCancel(false)}
      title={'Hủy giao dịch'}
      content={'Bạn có thực sự muốn hủy giao dịch này không?'}
      labelDone="Hủy bỏ"
      modalDelete
      />
       <ModalUi open={openModalAccept}
      onCancelClick={()=> setOpenModalAccept(false)}
      title={'Đồng ý giao dịch'}
      content={'Bạn có thực sự muốn đồng giao dịch  không?'}
      labelDone="Giao dịch"
      />
       <ModalUi open={openModalContact}
      onCancelClick={()=> setOpenModalContact(false)}
      isNotiModal
      title={'Thông tin liên hệ'}
      email={'trung@gmailc.om'}
      phone={'1111111'}
      />
       <ModalUi open={openModalRate}
      onCancelClick={()=> setOpenModalRate(false)}
      isModalRate
      title={'Đánh giá người giao dịch'}
      //content={'Bạn có thực sự muốn đồng giao dịch  không?'}
      labelDone="Đánh giá"
      onChangeRating={(event,newValue) =>{
        console.log('rate',newValue);
      }}
      />
    </div>
  );
}

AccordionUi.propTypes = {};

export default AccordionUi;
