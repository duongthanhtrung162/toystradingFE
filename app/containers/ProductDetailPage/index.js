/**
 *
 * ProductDetailPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectProductDetailPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import Paper from '@material-ui/core/Paper';
import Badge from '@material-ui/core/Badge';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import LocalAtmTwoToneIcon from '@material-ui/icons/LocalAtmTwoTone';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
//component
import { useSnackbar } from 'notistack';

import './ProductDetailPage.css';
import AppWrapper from '../../components/AppWrapper/index';
import Slide from '../../components/Slider/index';
import MediumText from '../../components/MediumText/index';
import ProductItem from '../../components/ProductItem/index';
import Carousel from '../../components/Carousel/index';
import { Link, useHistory,useLocation, useParams } from 'react-router-dom';
import * as PageActions from './actions';
import ModalUi from '../../components/ModalUi/index';

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);



export function ProductDetailPage(props) {
  useInjectReducer({ key: 'productDetailPage', reducer });
  useInjectSaga({ key: 'productDetailPage', saga });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [toy, setToy] = useState({});
  const [openModal, setOpenModal] = useState(false);

  let history = useHistory();
  let location = useLocation();
  let { productId } = useParams();

  const images = [
    {
      original: require('../../containers/HeaderNew/imageDefault.png')
     
    }
  ]
  const imagesView = [
    {
      src: require('../../containers/HeaderNew/imageDefault.png')
     
    }
  ]
 const getImageToy = (assets) => {
   let image = [];
   if(assets.length > 0){
     assets.map((item, index) =>{
      image.push({original : item.url})
     })
   }else {
    image.push({original : require('../../containers/HeaderNew/imageDefault.png')})
   }
   return image;
 }

 const getImageView = (assets) => {
  let image = [];
  if(assets.length > 0){
    assets.map((item, index) =>{
     image.push({src : item.url})
    })
  }else {
   image.push({src : require('../../containers/HeaderNew/imageDefault.png')})
  }
  return image;
 }

  const renderCity = (city) => {
    switch(city) {
     case "HN":
      return "Hà Nội";
      case "HCM":
      return "Hồ Chí Minh";
      case "CT":
      return "Cần Thơ";
      case "HP":
      return "Hải Phòng";
      case "DN":
      return "Đà Nẵng";
     
     default:
      return "";
    }
   }
   const renderAge = (age) => {
    switch(age) {
     case "0":
      return "0-12 tháng";
      case "13":
      return "1-3 tuổi";
      case "46":
      return "Cần Thơ";
      case "4-6 tuổi":
      return "6-11 tuổi";
      case "12":
      return "12 tuổi trở lên";
     default:
      return "";
    }
   }
   const handleOnUserClick = (userId) => {
    history.push(`/user/${userId}`);
  };
  const requestTransaction = async () => {
    let data = {toyId : productId}
    await props.requestToy(data)
    .then((rs) => {
      enqueueSnackbar('Yêu cầu thành công', {
        variant: 'success',
      });
    }
    )
    .catch((err)=> {
      enqueueSnackbar(err.response.data.message, {
        variant: 'error',
      });
    }
    )

  }
   useEffect(() => {
    (async() => {
      await props.getDetailToy(productId)
      .then((rs) => {
        
        setToy(rs.data.data);
    })
    .catch((err) => {
    });
     })();

  }, [location]);

  return (
    <div className="product-detail-page">
      <AppWrapper >
        <div className="product-detail-main">
          <div className="product-detail-section">
            <div className="product-infor-left-column">
              <Slide items={toy.assets ? getImageToy(toy.assets) : images} isGallery itemView={toy.assets ? getImageView(toy.assets) : imagesView}/>
              <div className="product-details">
            <MediumText mbNumber={15} style={{ textAlign: 'left', fontSize: '25px' }} className="subTitle-detail">
              Thông tin chi tiết
              </MediumText>
            <div className="product-detail-table">
              <div className="table-row">
                <div className="sub-title">Giới tính</div>
                <div className="content">{
                  toy.sex === "trai" ? "Bé trai" : "Bé gái"
                }</div>
              </div>
              <div className="table-row">
                <div className="sub-title">Độ tuổi</div>
                <div className="content">{
                  renderAge(toy.age)
                }</div>
              </div>
              <div className="table-row">
                <div className="sub-title">Khu vực</div>
                <div className="content">{
                 renderCity(toy.city)
                }</div>
              </div>
              <div className="table-row">
                <div className="sub-title">Tình trạng</div>
                <div className="content">
                  {
                    toy.condition === "M" ? "Còn mới" : "Đã sử dụng"
                  }
                </div>
              </div>
              <div className="table-row">
                <div className="sub-title">Mô tả</div>
                <div className="content">{                
                    toy.description
                }</div>
              </div>
              {/* <div className="table-row">
                <div className="sub-title">Link tham khảo</div>
                <div className="content"><a>dsdsdsds</a></div>
              </div> */}
              <div className="table-row">
                <div className="sub-title">Từ khóa</div>
                <div className="content tag-list">
                  {toy.tag_toys && toy.tag_toys.map((tagItem, index) => {
                    return (
                      <Chip
                        label={tagItem.tag}
                        className="tag-name"
                      />
                    )
                  })}
                  </div>
              </div>
            </div>
          </div>
            </div>
            <div className="product-infor-right-column">
              <MediumText mbNumber={20} style={{ textAlign: 'left', fontSize: '30px' }} className="product-name">
               {toy.toyName}
              </MediumText>
              <Link onClick={() => handleOnUserClick(toy.user.id)}>
                <Paper variant="outlined" className="user-account">
                  <div className="avatar">
                    <StyledBadge
                      overlap="circle"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      variant="dot" // status icon
                    >
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" style={{ height: '40px', width: '40px' }} />
                    </StyledBadge>
                  </div>
                  <div className="infor">
                    Người bán: <span>{toy.user ? toy.user.userName : '' }</span><br></br>
                   Đánh giá: <Rating name="read-only" value={toy.user ? toy.user.rate : 0 } readOnly precision={0.5} /><br></br>
                  </div>
                </Paper>
              </Link>
              <div className="product-price">
                <LocalAtmTwoToneIcon className="icon-coin" />
                <div>{toy.ecoin}</div>
              </div>
              <div className="btn-contact">
                {
                  toy.status ==="READY" ? (
                    <Button className="btn-done" variant="contained"
                    onClick={() => setOpenModal(true)}
                     startIcon={<FavoriteTwoToneIcon  />}>
                    Yêu cầu trao đổi
                   </Button>
                  ) : (
                    <Button className="btn-sold" disabled variant="contained" startIcon={<SentimentVeryDissatisfiedIcon  />}>
                    Đã bán
                   </Button>
  
                  )
                }
               
               
              </div>

            </div>
          </div>
          
        </div>
        <div className="related-products-main">
          <Carousel
            className="related-product-list"
            marginBottom={0}
            label={
              <MediumText mbNumber={0}>
                Đồ chơi liên quan
            </MediumText>
            }
            hideArrow
            slidesToShow={4}
            slidesToScroll={1}
            // items={images.map((item, index) => {
            //   return (<ProductItem item={item} />);
            // })}
          />
        </div>
      </AppWrapper>
      <ModalUi open={openModal}
        onCancelClick={() => setOpenModal(false)}
        title={'Yêu cầu trao đổi'}
        content={'Bạn có thực sự muốn giao dịch đồ chơi này?'}
        labelDone="Yêu cầu"
      onDoneClick={requestTransaction}
      />
    </div >
  );
}

ProductDetailPage.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  productDetailPage: makeSelectProductDetailPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getDetailToy : async (data) => {
      return new Promise((resolve, reject) => {
        return dispatch(PageActions.getDetailToy({ resolve, reject, data }));
      });
  },
  requestToy : async (data) => {
    return new Promise((resolve, reject) => {
      return dispatch(PageActions.requestToy({ resolve, reject, data }));
    });
},
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ProductDetailPage);
