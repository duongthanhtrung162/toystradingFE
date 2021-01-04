/**
 *
 * AccordionUi
 *
 */

import React,  {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
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
import moment from 'moment';

import ModalUi from '../ModalUi/index';

function AccordionUi(props) {
  const [openModalCancel,setOpenModalCancel] = useState(false);
  const [openModalRate,setOpenModalRate] = useState(false);
  const [openModalAccept,setOpenModalAccept] = useState(false);
  const [openModalContact,setOpenModalContact] = useState(false);
  const [openModalDone,setOpenModalDone] = useState(false);

  const {item ,type} = props;
  let history = useHistory();
  const [idTransaction, setidTransaction] = useState(0)
  
  const getUrlImage = (assets) => {
    const path = require('../../containers/HeaderNew/imageDefault.png');
    let temp = '';
    if (assets.length > 0) {
      temp = assets[0].url;
    } else {
      temp = path;
    }
    return temp;
  }
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
            <div className={'id'}>{item.id}</div>
          </div>
          <div className="offer-date wrapper">
            <span>Ngày gửi</span>
            <div className="date">{moment(item.createdAt).format('DD/MM/YYYY')}</div>
          </div>
          <div className="offer-status wrapper">

            <div className={`status ${item.status === "REQUEST" ? 'request' : (item.status === "ACCEPTED" ? 'accepted' : 'cancel')}`}>
              <span className="icon-status"></span>
              {item.status === "REQUEST" ? 'đang yêu cầu' : (item.status === "ACCEPTED" ? 'đồng ý giao dịch' : (item.status === "DONE" ? 'đã bán' : 'hủy bỏ') )}
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
                 src={item.toy.assets && getUrlImage(item.toy.assets) }
              />
              <div className="name">
                <Link onClick={() => history.push(`/product-detail/${item.toy.id}`)}>{item.toy.toyName}</Link>
              </div>
            </div>
            <div className="price">
              <LocalAtmTwoToneIcon style={{ color: 'yellow', marginRight: '5px' }} />
              {item.toy.ecoin}
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
                <Link onClick={() =>history.push(`/user/${item.user.id}`)}>{item.user.userName}</Link>
              </div>
            </div>

          </div>
          <div className="header btn">
            {
              item.status === 'REQUEST' || item.status === "ACCEPTED" ?  
              <Button
              className="btn cancel"
              style={{color:'white', backgroundColor: "red"}}
              variant="contained"
             onClick={() => {
              setidTransaction(item.id);
              setOpenModalCancel(true)
            }
              
              }
            >
              Hủy giao dịch
             </Button>
             : <div></div>
            }
          {
             item.status === 'REQUEST' && type === "sold" ? 
             <Button
              className="btn accept"
              variant="contained"
              startIcon={<ThumbUpAltIcon />}
            onClick={() => {
              setidTransaction(item.id)
              setOpenModalAccept(true)
            }
              
              }
            >
              Đồng ý trao đổi
             </Button>
             : <div></div>
          }
            {
             item.status === 'ACCEPTED' && type === "buy" ? 
             <Button
              className="btn accept"
              variant="contained"
              startIcon={<ThumbUpAltIcon />}
            onClick={() => {
              setidTransaction(item.id)
              setOpenModalDone(true)
            }
              
              }
            >
              Đã nhận hàng
             </Button>
             : <div></div>
          }
             {
               item.status !== 'REQUEST' ?  <Button
               className="btn contact"
               variant="contained"
               startIcon={<PermContactCalendarIcon />}
             onClick={() => setOpenModalContact(true)}
             >
               Thông tin liên hệ
              </Button>
              : <div></div>
             }
            {
               item.status === 'DONE' ?  <Button
               className="btn rate"
               variant="contained"
               startIcon={<GradeIcon />}
             onClick={() => setOpenModalRate(true)}
             >
               Đánh giá
              </Button>
              : <div></div>
             }
           

          </div>
        </AccordionDetails>
      </Accordion>

      <ModalUi open={openModalCancel}
      onCancelClick={()=> setOpenModalCancel(false)}
      title={'Hủy giao dịch'}
      content={'Bạn có thực sự muốn hủy giao dịch này không?'}
      labelDone="Hủy bỏ"
      modalDelete
      onDoneClick={() => {
        setOpenModalCancel(false);
         props.updateTrans(idTransaction,'CANCEL')}}

      />
       <ModalUi open={openModalAccept}
      onCancelClick={()=> setOpenModalAccept(false)}
      title={'Đồng ý giao dịch'}
      content={'Bạn có thực sự muốn đồng giao dịch  không?'}
      labelDone="Giao dịch"
      onDoneClick={() => {
        setOpenModalAccept(false);
        props.updateTrans(idTransaction,'ACCEPTED')
      }
        }

      />
       <ModalUi open={openModalDone}
      onCancelClick={()=> setOpenModalDone(false)}
      title={'Kết thúc giao dịch'}
      content={'Bạn đã nhận được sản phẩm?'}
      labelDone="Đã nhận"
      onDoneClick={() => {
        setOpenModalDone(false);
        props.updateTrans(idTransaction,'DONE')
      }}

      />
       <ModalUi open={openModalContact}
      onCancelClick={()=> setOpenModalContact(false)}
      isNotiModal
      title={`Thông tin liên hệ người ${type === "buy" ? "bán" : "mua"}`}
      email={item.user.email}
      phone={item.user.phone}
      />
       <ModalUi open={openModalRate}
      onCancelClick={()=> setOpenModalRate(false)}
      isModalRate
      title={`Đánh giá người giao dịch ${type === "buy" ? "bán" : "mua"}`}
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
