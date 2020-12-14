/**
 *
 * ProductDetailPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
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
import './ProductDetailPage.css';
import AppWrapper from '../../components/AppWrapper/index';
import Slide from '../../components/Slider/index';
import MediumText from '../../components/MediumText/index';
import ProductItem from '../../components/ProductItem/index';
import Carousel from '../../components/Carousel/index';

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

const images = [
  {
    src: 'https://picsum.photos/id/1018/1000/600/',
    original: 'https://picsum.photos/id/1018/1000/600/'

  },
  {
    src: 'https://picsum.photos/id/1015/1000/600/',
    original: 'https://picsum.photos/id/1015/1000/600/',

  },
  {
    src: 'https://picsum.photos/id/1019/1000/600/',
    original: 'https://picsum.photos/id/1019/1000/600/',

  },
  {
    src: 'https://picsum.photos/id/1019/1000/600/',
    original: 'https://picsum.photos/id/1019/1000/600/',

  },
  {
    src: 'https://p0ct8ommu0.vcdn.com.vn/media/wysiwyg/homepage/0-12TH.jpg',
    original: 'https://picsum.photos/id/1019/250/150/',
  },
  {
    src: 'https://p0ct8ommu0.vcdn.com.vn/media/wysiwyg/homepage/0-12TH.jpg',
    original: 'https://picsum.photos/id/1019/250/150/',
  },
  {
    src: 'https://p0ct8ommu0.vcdn.com.vn/media/wysiwyg/homepage/0-12TH.jpg',
    original: 'https://picsum.photos/id/1019/250/150/',
  }
];

export function ProductDetailPage() {
  useInjectReducer({ key: 'productDetailPage', reducer });
  useInjectSaga({ key: 'productDetailPage', saga });

  return (
    <div className="product-detail-page">
      <AppWrapper >
        <div className="product-detail-main">
          <div className="product-detail-section">
            <div className="product-infor-left-column">
              <Slide items={images} isGallery />
              <div className="product-details">
            <MediumText mbNumber={15} style={{ textAlign: 'left', fontSize: '25px' }} className="subTitle-detail">
              Thông tin chi tiết
              </MediumText>
            <div className="product-detail-table">
              <div className="table-row">
                <div className="sub-title">Giới tính</div>
                <div className="content">Nam</div>
              </div>
              <div className="table-row">
                <div className="sub-title">Độ tuổi</div>
                <div className="content">1 - 3 tuổi</div>
              </div>
              <div className="table-row">
                <div className="sub-title">Khu vực</div>
                <div className="content">Tphcm</div>
              </div>
              <div className="table-row">
                <div className="sub-title">Tình trạng</div>
                <div className="content">Đã qua sử dụng</div>
              </div>
              <div className="table-row">
                <div className="sub-title">Mô tả</div>
                <div className="content">còn mới</div>
              </div>
              <div className="table-row">
                <div className="sub-title">Link tham khảo</div>
                <div className="content"><a>dsdsdsds</a></div>
              </div>
              <div className="table-row">
                <div className="sub-title">Từ khóa</div>
                <div className="content tag-list">
                  {images.map((tagItem, index) => {
                    return (
                      <Chip
                        label={'basiccccccsssssssssssssssssssssscc'}
                        //onClick={}
                        className="tag-name"
                      />
                    )
                  })}</div>
              </div>
            </div>
          </div>
            </div>
            <div className="product-infor-right-column">
              <MediumText mbNumber={20} style={{ textAlign: 'left', fontSize: '30px' }} className="product-name">
                San phamSan phamSan phamSan pham
              </MediumText>
              <Link to='/'>
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
                    Tên tài khoản: <span>Trung</span><br></br>
                   Đánh giá: <Rating name="read-only" value={3.5} readOnly precision={0.5} /><br></br>
                  </div>
                </Paper>
              </Link>
              <div className="product-price">
                <LocalAtmTwoToneIcon className="icon-coin" />
                <div>10</div>
              </div>
              <div className="btn-contact">
                <Button className="btn-done" variant="contained" startIcon={<FavoriteTwoToneIcon  />}>
                  Yêu cầu trao đổi
                 </Button>
                 <Button className="btn-sold" disabled variant="contained" startIcon={<SentimentVeryDissatisfiedIcon  />}>
                  Đã bán
                 </Button>

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
            items={images.map((item, index) => {
              return (<ProductItem item={item} />);
            })}
          />
        </div>
      </AppWrapper>
    </div >
  );
}

ProductDetailPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  productDetailPage: makeSelectProductDetailPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ProductDetailPage);
