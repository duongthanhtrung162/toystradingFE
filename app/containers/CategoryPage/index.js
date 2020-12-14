/**
 *
 * CategoryPage
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCategoryPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './CategoryPage.css';
import AppWrapper from '../../components/AppWrapper/index';
import Slider from '@material-ui/core/Slider';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import SortIcon from '@material-ui/icons/Sort';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ProductItem from '../../components/ProductItem/index';


const GreenCheckbox = withStyles({
  root: {
    color: '#00B7EB',
    '&$checked': {
      color: '#00B7EB',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);
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


export function CategoryPage() {
  useInjectReducer({ key: 'categoryPage', reducer });
  useInjectSaga({ key: 'categoryPage', saga });
  const [value, setImageNew] = useState([100, 300]);
  const [checked, setChecked] = React.useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
    
  return (
    <div className="category-page-wrapper">
      <AppWrapper >
        <div className="category-page-main">
          <div className="left-column">
            <div className="left-column-item">
              <div className="title ecoin">
                ECOIN
              </div>
              <Slider
                defaultValue={value}
                getAriaValueText={value => value}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="on"
                min={10}
                max={500}
              />
            </div>
            <div className="left-column-item">
              <div className="title">
                TÌNH TRẠNG
              </div>
              <div clasName="input-condition">
                <FormControlLabel
                  control={<GreenCheckbox checked={checked} onChange={handleChange} name="checkedG" />}
                  label={<span style={{ fontSize: '14px' }}>Đã sử dụng</span>}
                  className="checkbox-item"
                  value="used"
                />
                <FormControlLabel
                  control={<GreenCheckbox checked={checked} onChange={handleChange} name="checkedG" />}
                  label={<span style={{ fontSize: '14px' }}>Còn mới</span>}
                  value="new"
                  className="checkbox-item"
                />

              </div>
            </div>
            <div className="left-column-item">
              <div className="title">
                GIỚI TÍNH
              </div>
              <div clasName="input-condition">
                <FormControlLabel
                  control={<GreenCheckbox checked={checked} onChange={handleChange} name="checkedG" />}
                  label={<span style={{ fontSize: '14px' }}>Bé trai</span>}
                  className="checkbox-item"
                  value="male"
                />
                <FormControlLabel
                  control={<GreenCheckbox checked={checked} onChange={handleChange} name="checkedG" />}
                  label={<span style={{ fontSize: '14px' }}>Bé gái</span>}
                  value="female"
                  className="checkbox-item"
                />

              </div>
            </div>
            <div className="left-column-item">
              <div className="title">
                ĐỘ TUỔI
              </div>
              <div clasName="input-condition">
                <FormControlLabel
                  control={<GreenCheckbox checked={checked} onChange={handleChange} name="checkedG" />}
                  label={<span style={{ fontSize: '14px' }}>0-12 tháng</span>}

                  className="checkbox-item"
                  value="male"
                />
                <FormControlLabel
                  control={<GreenCheckbox checked={checked} onChange={handleChange} name="checkedG" />}
                  value="female"
                  label={<span style={{ fontSize: '14px' }}>1-3 tháng</span>}

                  className="checkbox-item"
                />
                <FormControlLabel
                  control={<GreenCheckbox checked={checked} onChange={handleChange} name="checkedG" />}
                  label={<span style={{ fontSize: '14px' }}>4-6 tháng</span>}

                  value="female"
                  className="checkbox-item"
                />
                <FormControlLabel
                  control={<GreenCheckbox checked={checked} onChange={handleChange} name="checkedG" />}
                  label={<span style={{ fontSize: '14px' }}>6-11 tháng</span>}
                  value="female"
                  className="checkbox-item"
                />
                <FormControlLabel
                  control={<GreenCheckbox checked={checked} onChange={handleChange} name="checkedG" />}
                  label={<span style={{ fontSize: '14px' }}>12 tháng trở lên</span>}
                  value="female"
                  className="checkbox-item"
                />

              </div>
            </div>

          </div>

          <div className="right-column">
            <div  className="sort-list">
              <span className="title">Sắp xếp theo</span>
              <div className="sort-item">
                <ArrowDownwardIcon />
                <SortIcon />
                <span>Giá cao</span>
              </div>
              <div className="sort-item">
                <ArrowUpwardIcon />
                <SortIcon />
                <span>Giá thấp</span>
              </div>
            </div>
            <div className="product-list">
            {images.map((item, index) => {
              return (<ProductItem className="home" item={item}  marginLR={10} marginTB={10} />);
            })}
            </div>
          </div>
        </div>
      </AppWrapper>
    </div>
  );
}

CategoryPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  categoryPage: makeSelectCategoryPage(),
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

export default compose(withConnect)(CategoryPage);
