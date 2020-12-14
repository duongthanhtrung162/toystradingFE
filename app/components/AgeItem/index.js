/**
 *
 * AgeItem
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Image } from 'antd';
import MediumText from '../../components/MediumText/index';
import './AgeItem.css';
import firstAge from './firstAge.jpg';
import secondAge from './secondAge.jpg';
import thirdAge from './thirdAge.jpg';
import fourthAge from './fourthAge.jpg';
import fifthAge from './fifthAge.jpg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Paper from '@material-ui/core/Paper';

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  speed: 3000,
  autoplaySpeed: 2000,
  cssEase: "linear"
};

function AgeItem() {
  return (
    <Paper className="age-category-list">
      <Slider {...settings}>
        <div className="ageImg-items">
          <a href="sdsds" >
            <img src={firstAge} alt="boohoo" className="img-responsive" />
          </a>
        </div>
        <div className="ageImg-items">
          <a href="sdsds" >
            <img src={secondAge} alt="boohoo" className="img-responsive" />
          </a>
        </div>
        <div className="ageImg-items">
          <a href="sdsds" >
            <img src={thirdAge} alt="boohoo" className="img-responsive" />
          </a>
        </div>
        <div className="ageImg-items">
          <a href="sdsds" >
            <img src={fourthAge} alt="boohoo" className="img-responsive" />
          </a>
        </div>
        <div className="ageImg-items">
          <a href="sdsds" >
            <img src={fifthAge} alt="boohoo" className="img-responsive" />
          </a>
        </div>
      </Slider>
    </Paper>

  );
}

AgeItem.propTypes = {};

export default AgeItem;
