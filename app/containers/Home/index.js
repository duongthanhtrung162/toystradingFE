/**
 *
 * Home
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';


import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHome from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './Home.css';
//component
import Slide from '../../components/Slider/index';
import Carousel from '../../components/Carousel/index';
import MediumText from '../../components/MediumText/index';
import AppWrapper from '../../components/AppWrapper/index';
import ProductItem from '../../components/ProductItem/index';
import CategoryItem from '../../components/CategoryItem/index';
import AgeItem from '../../components/AgeItem/index';

import * as PageActions from './actions';

export function Home(props) {
  useInjectReducer({ key: 'home', reducer });
  useInjectSaga({ key: 'home', saga });
  const listToyNew = props.home.newestListToy;

  const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
    {
      original: 'https://p0ct8ommu0.vcdn.com.vn/media/wysiwyg/homepage/0-12TH.jpg',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    }
  ];

  useEffect(() => {
    
    (async() => {
     await props.getNewestToy();
     //setCategoryList(result.data.data.data); 
    })();
  }, []);

  return (
    <div className="home-main">
      <AppWrapper className="content-wrapper">
        <div className="home-main-slider">
          <Slide items={images} />
        </div>
        <div className="home-main-product">
          <Carousel
            label={
              <MediumText mbNumber={0}>
                Đồ chơi mới nhất
            </MediumText>
            }
            marginBottom={20}
            hideArrow
            slidesToShow={4}
            slidesToScroll={1}
            items={listToyNew.map((item, index) => {
              return (<ProductItem item={item} />);
            })}
          />

          <div className="home-main-age">
            <AgeItem />
          </div>
          {/* <div className="home-main-category">
            <Paper>
            <Carousel
            
            marginBottom={20}
            hideArrow
            slidesToShow={5}
            slidesToScroll={1}
            items={images.map((item, index) => {
              return (<CategoryItem className="home" item={item} src={item.original} width={360.66} />);
            })}
          />
            </Paper>
          </div> */}
        </div>
      </AppWrapper>





    </div>
  );
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  home: makeSelectHome(),
});

function mapDispatchToProps(dispatch) {
  return {
    getNewestToy : async () => {
      return new Promise((resolve, reject) => {
        return dispatch(PageActions.getNewestToy({ resolve, reject }));
      });
  }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Home);
