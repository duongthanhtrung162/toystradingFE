/**
 *
 * Carousel
 *
 */

import React, { useEffect, useRef, useState } from 'react';
import Slider from "react-slick";
import PropTypes from 'prop-types';
import IconCustom from '../IconCustom/index';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Carousel.css';
import ArrowRightTwoToneIcon from '@material-ui/icons/ArrowRightTwoTone';
import ArrowLeftTwoToneIcon from '@material-ui/icons/ArrowLeftTwoTone';

const classWrapper = 'carousel';

function Carousel(props) {
  const carouselRef = useRef(null);
  const [disabledPre, setDisabledPre] = useState(true);
  const [disabledNext, setDisabledNext] = useState(false);
  const [nextIndex, setNextIndex] = useState(0);

  useEffect(() => {
    setDisabledPre(true);
    if (nextIndex && nextIndex !== 0) {
      setDisabledPre(false);
    }

    setDisabledNext(false);
    if (props.items.length - nextIndex <= props.slidesToShow) {
      setDisabledNext(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextIndex, props.items]);

  const settings = {
    dots: false,
    infinite: props.infinite,
    lazyLoad: true,
    autoplay: false,
    speed: 2000,
    slidesPerRow: props.slidesPerRow,
    slidesToShow: props.slidesToShow,
    slidesToScroll: props.slidesToScroll,
    arrows: false,
    beforeChange: (current, next) => {
      setNextIndex(next);
    },
  };


  return (
    <div
      style={{
        marginBottom: props.marginBottom,
      }}
      className={`${classWrapper}-wrapper`}
    >
      <div className="carousel-header">
        {props.items.length > 0 && (
          <>
            {props.label}
            {props.items.length > props.slidesToShow && (
              <div className="arrow-wrapper">
                <div
                  className={`btn-pre ${disabledPre ? 'disabled' : ''}`}
                  onClick={() => {
                    !disabledPre && carouselRef.current.slickPrev();
                  }}
                >
                  <ArrowLeftTwoToneIcon />
                </div>
                <div
                  className={`btn-next ${disabledNext ? 'disabled' : ''}`}
                  onClick={() => {
                    !disabledNext && carouselRef.current.slickNext();
                  }}
                >
                  <ArrowRightTwoToneIcon />
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <Slider
        {...settings}
        infinite={props.items.length > props.slidesToShow}
        ref={carouselRef}
      >
        {props.items}
      </Slider>
    </div>
  );
}

Carousel.propTypes = {
  label: PropTypes.any,
  slidesToShow: PropTypes.number,
  marginBottom: PropTypes.number,
  slidesToScroll: PropTypes.number,
  slidesPerRow: PropTypes.number,
  items: PropTypes.array,
  itemComponent: PropTypes.any,
  hideArrow: PropTypes.bool,
  infinite: PropTypes.bool,
};
Carousel.defaultProps = {
  items: [],
  marginBottom: 30,
  hideArrow: false,
  slidesPerRow: 1,
  infinite: true,
};

export default Carousel;
