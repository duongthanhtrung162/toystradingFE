/**
 *
 * CategoryPage
 *
 */

import React, { useEffect, useState } from 'react';
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
import Chip from '@material-ui/core/Chip';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {
  Link,
  useHistory,
  useLocation
} from "react-router-dom";
import queryString from 'query-string';
import routesLinks from '../App/routesLinks';
import { useFormik } from 'formik';
import * as yup from 'yup';
const GreenRadio = withStyles({
  root: {
    color: '#00B7EB',
    '&$checked': {
      color: '#00B7EB',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

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
  const tagList = props.categoryPage.tagList;

  let history = useHistory();
  let location = useLocation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();


  const [ecoinDefault, setEcoinDefault] = useState([0, 1000000]);

  const [toyList, setToyList] = React.useState([]);

  const [errorFilter, setErrorFilter] = useState(false);

  const dataQuery = queryString.parse(location.search);
  if (dataQuery.age) {
    if (typeof (dataQuery.age) === 'string') {
      dataQuery.age = dataQuery.age.split();

    }
  }
  const handleChange0 = (event) => {
    const dataQuery = queryString.parse(location.search);
    if (dataQuery.age) {
      if (typeof (dataQuery.age) === 'string') {
        dataQuery.age = dataQuery.age.split();
      }
    }
    if (event.target.checked) {
      dataQuery.age = 0;
      const stringified = queryString.stringify(dataQuery);
      history.push({
        pathname: `${routesLinks.category}`,
        search: stringified
      })
    } else {
      const index = colors.indexOf("0");
      dataQuery.age.splice(index,1);
      const stringified = queryString.stringify(dataQuery);
      history.push({
        pathname: `${routesLinks.category}`,
        search: stringified
      })
    }
  };

  const handleChangeEcoin = (data) => {

    const dataQuery = queryString.parse(location.search);
    dataQuery.min = data[0];
    dataQuery.max = data[1];

    const stringified = queryString.stringify(dataQuery);
    history.push({
      pathname: `${routesLinks.category}`,
      search: stringified
    })
  }
  const handleChangeCondition = (event) => {

    const dataQuery = queryString.parse(location.search);
    dataQuery.condition = event.target.value;
    const stringified = queryString.stringify(dataQuery);
    history.push({
      pathname: `${routesLinks.category}`,
      search: stringified
    })
  }
  const handleChangeSex = (event) => {

    const dataQuery = queryString.parse(location.search);
    dataQuery.sex = event.target.value;
    const stringified = queryString.stringify(dataQuery);
    history.push({
      pathname: `${routesLinks.category}`,
      search: stringified
    })
    setRadioSex(event.target.value);
  }
  const handleChangeTag = (idTag) => {

    const dataQuery = queryString.parse(location.search);
    dataQuery.tag = idTag
    const stringified = queryString.stringify(dataQuery);
    history.push({
      pathname: `${routesLinks.category}`,
      search: stringified
    })
  }
  const sortAscending = () => {
    const myData = [].concat(toyList)
      .sort((a, b) => a.ecoin >= b.ecoin ? 1 : -1);
    setToyList(myData);
  }
  const sortDecreasing = () => {
    const myData = [].concat(toyList)
      .sort((a, b) => a.ecoin <= b.ecoin ? 1 : -1);
    setToyList(myData);
  }


  useEffect(() => {
    (async () => {
      await props.getTagList();
      //setCategoryList(result.data.data.data); 
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const dataQuery = queryString.parse(location.search);
      if (dataQuery.age) {
        if (typeof (dataQuery.age) === 'string') {
          dataQuery.age = dataQuery.age.split();

        }
      }

      console.log('dataaaaaaaaaaa', dataQuery);
      await props.filterToy(dataQuery)
        .then((rs) => {

          if (rs.data.data.data.length > 0) {
            setErrorFilter(false)
            setToyList(rs.data.data.data);

          } else {
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
                max={1000000}
                onChange={(e, data) => {
                  handleChangeEcoin(data);
                }}
              />
            </div>
            <div className="left-column-item">
              <div className="title">
                TÌNH TRẠNG
              </div>
              <div clasName="input-condition">
                <RadioGroup aria-label="condition" name="condition" value={dataQuery.condition ? dataQuery.condition : 'S'} onChange={handleChangeCondition}>
                  <FormControlLabel value="S" control={<GreenRadio />} label={<span style={{ fontSize: '14px' }}>Đã sử dụng</span>} />
                  <FormControlLabel value="M" control={<GreenRadio />} label={<span style={{ fontSize: '14px' }}>Còn mới</span>} />
                </RadioGroup>


              </div>
            </div>
            <div className="left-column-item">
              <div className="title">
                GIỚI TÍNH
              </div>
              <div clasName="input-condition">
                <RadioGroup aria-label="sex" name="sex" value={dataQuery.sex ? dataQuery.sex : 'trai'}
                  onChange={handleChangeSex}>
                  <FormControlLabel value="trai" control={<GreenRadio />} label={<span style={{ fontSize: '14px' }}>Bé trai</span>} />
                  <FormControlLabel value="gai" control={<GreenRadio />} label={<span style={{ fontSize: '14px' }}>Bé gái</span>} />
                </RadioGroup>

              </div>
            </div>
            {/* <div className="left-column-item">
              <div className="title">
                ĐỘ TUỔI
              </div>
              <div clasName="input-condition">
                <FormControlLabel
                  control={<GreenCheckbox checked={dataQuery.age ? dataQuery.age.some((element) => element === "0") : false} onChange={handleChange0} name="checkedG" />}
                  label={<span style={{ fontSize: '14px' }}>0-12 tháng</span>}

                  className="checkbox-item"
                  value="male"
                />
                <FormControlLabel
                  control={<GreenCheckbox checked={dataQuery.age ? dataQuery.age.some((element) => element === "13") : false} onChange={handleChange0} name="checkedG" />}
                  value="female"
                  label={<span style={{ fontSize: '14px' }}>1-3 tháng</span>}

                  className="checkbox-item"
                />
                <FormControlLabel
                  control={<GreenCheckbox checked={dataQuery.age ? dataQuery.age.some((element) => element === "46") : false} onChange={handleChange0} name="checkedG" />}
                  label={<span style={{ fontSize: '14px' }}>4-6 tháng</span>}

                  value="female"
                  className="checkbox-item"
                />
                <FormControlLabel
                  control={<GreenCheckbox checked={dataQuery.age ? dataQuery.age.some((element) => element === "611") : false} onChange={handleChange0} name="checkedG" />}
                  label={<span style={{ fontSize: '14px' }}>6-11 tháng</span>}
                  value="female"
                  className="checkbox-item"
                />
                <FormControlLabel
                  control={<GreenCheckbox checked={dataQuery.age ? dataQuery.age.some((element) => element === "12") : false} onChange={handleChange0} name="checkedG" />}
                  label={<span style={{ fontSize: '14px' }}>12 tháng trở lên</span>}
                  value="female"
                  className="checkbox-item"
                />

              </div>
            </div> */}
            <div className="left-column-item">
              <div className="title">
                TAGS
              </div>
              <div clasName="input-condition">
                {tagList.length > 0 && tagList.map((tagItem, index) => {
                  return (
                    <Chip
                      style={{ margin: '2px', cursor: 'pointer' }}
                      label={tagItem.value}
                      className="tag-name"
                      onClick={() => handleChangeTag(tagItem.id)}
                    />
                  )
                })}

              </div>
            </div>


          </div>

          <div className="right-column">
            <div className="sort-list">
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
                return (<ProductItem className="home" item={item} marginLR={10} marginTB={10} />);
              })}
              {
                errorFilter && <div style={{ margin: 'auto', fontSize: '20px' }}>Không tìm thấy đồ chơi</div>
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
    filterToy: async (data) => {
      return new Promise((resolve, reject) => {
        return dispatch(PageActions.filterToy({ resolve, reject, data }));
      });
    },
    getTagList: async () => {
      return new Promise((resolve, reject) => {
        return dispatch(PageActions.getTagList({ resolve, reject }));
      });
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CategoryPage);
