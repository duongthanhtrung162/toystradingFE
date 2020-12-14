/**
 *
 * Slider
 *
 */

import React, { memo, useRef, useState } from 'react';
import './Slider.css';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import Viewer from 'react-viewer';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Slider(props) {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);


  return (
    <div
      style={{
        marginBottom: props.marginBottom,
      }}
      className={`${props.isGallery ? 'gallery-wrapper' : 'slider-wrapper'}`}
    >
      {props.isGallery ? (
        <ImageGallery
          items={props.items}
          showThumbnails={false}
          showBullets={true}
          showIndex={true}
          indexSeparator=" / "
          showPlayButton={false}
          showFullscreenButton={false}
          infinite={false}
          startIndex={currentIndex}
          onSlide={currentIndex => setCurrentIndex(currentIndex)}
          onClick={() => setVisible(true)}
        />
      ) : (
          <ImageGallery
            autoPlay={true}
            slideDuration={props.slideDuration}
            slideInterval={props.slideInterval}
            ref={sliderRef}
            items={props.items}
            showBullets={true}
            lazyLoad
            showThumbnails={false}
            showPlayButton={false}
            showFullscreenButton={false}
          />
        )}
      {/* <ModalGallery open={showModal} handleClose={() => setShowModal(false)}>
        <div
          style={{
            marginBottom: props.marginBottom,
          }}
          className={`${
            props.isGallery ? 'gallery-wrapper' : 'slider-wrapper'
          }`}
        >
          <ImageGallery
            items={props.items}
            showBullets={false}
            startIndex={currentIndex}
            showThumbnails={false}
            showIndex
            indexSeparator=" out of "
            showPlayButton={false}
            showFullscreenButton={false}
            infinite={false}
            onSlide={currentIndex => setCurrentIndex(currentIndex)}
            onClick={() => setShowModal(true)}
            renderLeftNav={(onClick, disabled) =>
              renderLeftNav({
                onClick,
                disabled,
                isGallery: props.isGallery,
                preIcon: (
                  <IconCustom className="ic_keyboard_arrow_left" size={26} />
                ),
              })
            }
            renderRightNav={(onClick, disabled) =>
              renderRightNav({
                onClick,
                disabled,
                isGallery: props.isGallery,
                nextIcon: (
                  <IconCustom className="ic_keyboard_arrow_right" size={26} />
                ),
              })
            }
          />
        </div>
      </ModalGallery> */}
      <Viewer
        visible={visible}
        onClose={() => { setVisible(false); }}
        images={props.items}
        rotatable={false}
        activeIndex={currentIndex}
      />
    </div>
  );
}

Slider.propTypes = {};

export default Slider;
