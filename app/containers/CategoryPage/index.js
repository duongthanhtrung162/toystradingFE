/**
 *
 * CategoryPage
 *
 */

import React, {useEffect, useState } from 'react';
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
import { useSnackbar } from 'notistack';

import './CategoryPage.css';
import AppWrapper from '../../components/AppWrapper/index';
import Slider from '@material-ui/core/Slider';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import SortIcon from '@material-ui/icons/Sort';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ProductItem from '../../components/ProductItem/index';
import Button from '@material-ui/core/Button';
import * as PageActions from './actions';

import {
  Link,
  useHistory,
  useLocation
} from "react-router-dom";
import queryString from 'query-string';

const GreenCheckbox = withStyles({
  root: {
    color: '#00B7EB',
    '&$checked': {
      color: '#00B7EB',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);



export function CategoryPage(props) {
  useInjectReducer({ key: 'categoryPage', reducer });
  useInjectSaga({ key: 'categoryPage', saga });

   let history = useHistory();
   let location = useLocation();
   const { enqueueSnackbar, closeSnackbar } = useSnackbar();

   const [errorFilter, setErrorFilter] = useState(false);

  const [ecoinDefault, setEcoinDefault] = useState([0, 500]);
  const [ecoin, setEcoin] = useState([]);
  const [checked, setChecked] = React.useState(true);
  const [toyList, setToyList] = React.useState([]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  
  const onFilter = () =>{
    history.push('category?city=HN');
  }

  const sortAscending = () =>{
    const myData = [].concat(toyList)
    .sort((a, b) => a.ecoin >= b.ecoin ? 1 : -1);
    setToyList(myData);
  }
  const sortDecreasing = () =>{
    const myData = [].concat(toyList)
    .sort((a, b) => a.ecoin <= b.ecoin ? 1 : -1);
    setToyList(myData);
  }

  useEffect(() => {
    (async() => {
      const dataQuery = queryString.parse(location.search);   
      await props.filterToy(dataQuery)
      .then((rs) => {
        
        if(rs.data.data.data.length > 0){
          setErrorFilter(false)
          setToyList(rs.data.data.data);

        }else{
          setToyList(rs.data.data.data);
          setErrorFilter(true);

        }
    })
    .catch((err) => {
     
    });
     })();

  }, [location]);
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
                defaultValue={ecoinDefault}
                getAriaValueText={value => value}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="on"
                min={0}
                max={500}
                onChange={(e, data)=>{
                  setEcoin(data);
                  console.log('slideeeeeeee',data)
                }}
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
                  value="S"
                />
                <FormControlLabel
                  control={<GreenCheckbox checked={checked} onChange={handleChange} name="checkedG" />}
                  label={<span style={{ fontSize: '14px' }}>Còn mới</span>}
                  value="M"
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
            <div className="left-column-item">
            <Button
                variant="contained"
                className="btn filter"
               onClick={onFilter}
              > Tìm kiếm
              </Button>
            </div>

          </div>

          <div className="right-column">
            <div  className="sort-list">
              <span className="title">Ecoin: </span>
              <div className="sort-item" onClick={sortDecreasing}>
                <ArrowDownwardIcon />
                <SortIcon />
                <span>Giảm dần </span>
              </div>
              <div className="sort-item" onClick={sortAscending}>
                <ArrowUpwardIcon />
                <SortIcon />
                <span>Tăng dần</span>
              </div>
            </div>
            <div className="product-list">
            {toyList.map((item, index) => {
              return (<ProductItem className="home" item={item}  marginLR={10} marginTB={10} />);
            })}
            {
              errorFilter && <div style={{margin: 'auto', fontSize: '20px'}}>Không tìm thấy đồ chơi</div> 
            }
              
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
    filterToy : async (data) => {
      return new Promise((resolve, reject) => {
        return dispatch(PageActions.filterToy({ resolve, reject, data }));
      });
  }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CategoryPage);
