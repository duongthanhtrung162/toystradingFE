/**
 *
 * ToyListPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectToyListPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './ToyListPage.css';
//component
import LargeText from '../../components/LargeText/index';
import MaterialTableUi from '../../components/MaterialTableUi/index';
import { EuroCircleOutlined } from '@ant-design/icons';
import CardMedia from '@material-ui/core/CardMedia';
import LocalAtmTwoToneIcon from '@material-ui/icons/LocalAtmTwoTone';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Chip from '@material-ui/core/Chip';

export function ToyListPage() {
  useInjectReducer({ key: 'toyListPage', reducer });
  useInjectSaga({ key: 'toyListPage', saga });
  const columns = [{
    name: "img",
    label: "Hình ảnh ",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <div>
            <img
              style={{
                height: 60,
                width: 80
              }}
              src={value}
            />
          </div>
        )
      }
    }
  }, {
    name: "Name",
    label: "Đồ chơi ",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <div className="product-name">
            {value}
          </div>
        )
      }
    }
  },
  {
    name: "Ecoin",
    label: "Ecoin ",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <div>
            <LocalAtmTwoToneIcon className="icon-ecoin" />
            {value}
          </div>
        )
      }
    }
  }
    , {
    name: "Status",
    label: "Trạng thái ",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <div>
            <Chip label={value} className="iconStatus new" variant="outlined" />
          </div>
        )
      }
    }
  }, {
    name: "id",
    label: "Chỉnh sửa ",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <IconButton className="icon-edit">
            <EditIcon />
          </IconButton>
        )
      }
    }
  }];

  const data = [{
    "id": 1, "img": "https://picsum.photos/id/1019/1000/600/",
    "Name": "Plumber", "Ecoin": 30, "Status": "đang bán"
  },
  {
    "id": 1, "img": "https://picsum.photos/id/1019/1000/600/",
    "Name": "sssssssssssssssssssssssssssssssssss", "Ecoin": 30, "Status": "đang bán"
  }]


  return (
    <div>
      <Helmet>
        <title>ToyListPage</title>
        <meta name="description" content="Description of ToyListPage" />
      </Helmet>
      <div className="toy-list-page-wrapper">
        <MaterialTableUi
          className="table-toy-list"
          title={'Đồ chơi'}
          data={data}
          columns={columns}
          filterType={'dropdown'}

        />


      </div>
    </div>
  );
}

ToyListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  toyListPage: makeSelectToyListPage(),
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

export default compose(withConnect)(ToyListPage);
