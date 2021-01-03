/**
 *
 * ToyListPage
 *
 */

import React, { useState, useEffect } from 'react';
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
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
//component
import LargeText from '../../components/LargeText/index';
import MaterialTableUi from '../../components/MaterialTableUi/index';
import { EuroCircleOutlined } from '@ant-design/icons';
import CardMedia from '@material-ui/core/CardMedia';
import LocalAtmTwoToneIcon from '@material-ui/icons/LocalAtmTwoTone';
import * as PageActions from './actions';
import { useSnackbar } from 'notistack';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ModalUi from '../../components/ModalUi/index';
import routesLinks from '../App/routesLinks';

export function ToyListPage(props) {
  useInjectReducer({ key: 'toyListPage', reducer });
  useInjectSaga({ key: 'toyListPage', saga });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let history = useHistory();
  let location = useLocation();
  let listToy = props.toyListPage.listToy;
  const [openModal, setOpenModal] = useState(false);
  const [idDelete, setIdDelete] = useState(0);


  const getUrlImage = (assets) => {
    const path = require('../../containers/HeaderNew/imageDefault.png');
    let temp = '';
    if (assets.length > 0) {
      temp = assets[0].url;
    } else {
      temp = path;
    }
    return temp;
  }
  const columns = [{
    name: "assets",
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
              src={getUrlImage(value)}
            />
          </div>
        )
      }
    }
  }, {
    name: "toyName",
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
    name: "ecoin",
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
    name: "status",
    label: "Trạng thái ",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <div className={`status ${value === "READY" ? 'request' : (value === "SOLD" ? 'cancel' : 'accepted')}`}>
            <span className="icon-status"></span>
            {value === "READY" ? 'sẵn sàng' : (value === "SOLD" ? 'đã bán' : 'đang giao dịch')}
          </div>
        )
      }
    }
  }, {
    name: "id",
    label: "Thao tác ",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <div>
          <Button
          variant="contained"
          style = {{marginRight: '10px'}}
          onClick ={ () => {
            history.push(`${routesLinks.dashboardPage}/toy/add?id=${value}`);

          }}
          color="primary"
          startIcon={<EditIcon></EditIcon>}
      >
          Sửa
      </Button>      
      <Button
      variant="contained"
      color="secondary"
      startIcon={<DeleteIcon />}
      onClick ={ () => {
        setIdDelete(value);
        setOpenModal(true);
      }}
      >
      Xóa
  </Button>
  </div>
        )
      }
    }
  }];
  const deleteItem = (id) => {
    props.deleteToy(id)
    .then((rs) => {
      props.getListToy();
      setOpenModal(false);

      enqueueSnackbar('Xóa thành công', {
        variant: 'success',
      });
    }
    )
    .catch((err)=> {
    }
    )
  }
 
  useEffect(() => {
    (async () => {
      await props.getListToy()
        .then((rs) => {

          //setToy(rs.data.data);
        })
        .catch((err) => {
        });
    })();

  }, []);

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
          data={listToy}
          columns={columns}
          filterType={'dropdown'}

        />


      </div>
      <ModalUi open={openModal}
      modalDelete
        onCancelClick={() => setOpenModal(false)}
        title={'Xóa đồ chơi'}
        content={'Bạn có thực sự muốn xóa đồ chơi này?'}
        labelDone="Xóa"
      onDoneClick={() => deleteItem(idDelete)}
      />
    </div>
  );
}

ToyListPage.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  toyListPage: makeSelectToyListPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListToy: async () => {
      return new Promise((resolve, reject) => {
        return dispatch(PageActions.getListToy({ resolve, reject }));
      });
    },
    deleteToy : async (data) => {
      return new Promise((resolve, reject) => {
        return dispatch(PageActions.deleteToy({ resolve, reject,data }));
      });
  },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ToyListPage);
