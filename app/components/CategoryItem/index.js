/**
 *
 * CategoryItem
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Image } from 'antd';

import MediumText from '../../components/MediumText/index';


function CategoryItem({ width, height, preview, src, alt, item,className }) {
  return (
    <div className={`category-item-${className}`}>
      <Image
        width={width}
        height={height}
        preview={false}
        src={src}
      />
      <MediumText mbNumber={0}>
        Tên danh mục
      </MediumText>
    </div>

  );
}

CategoryItem.propTypes = {};

export default CategoryItem;
