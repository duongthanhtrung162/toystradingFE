/**
 *
 * ProductItem
 *
 */

import React, { useState } from 'react';
import moment from 'moment';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { EuroCircleOutlined } from '@ant-design/icons';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextTruncate from 'react-text-truncate';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import LocalAtmTwoToneIcon from '@material-ui/icons/LocalAtmTwoTone';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import isEmpty from 'lodash';
import routesLinks from '../../containers/App/routesLinks';
import { Link, useHistory } from 'react-router-dom';

import './ProductItem.css'
import ModalUi from '../ModalUi/index';
const useStylesFisrt = makeStyles({
  root: {
    width: 260,
  },
  media: {
    height: 200,
    margin: 8

  },
  productName: {
    fontWeight: 700,
    fontSize: 16,
    color: '#23a1d1',
    marginBottom: 0,

  }
});

const useStylesSecond = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: '10px',
    marginBottom: '10px',
    height: '140px',
  },
  details: {
    display: 'flex',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },


}));

function ProductItem({ isProductUser, item, marginLR, marginTB, style }) {
  const classesFirst = useStylesFisrt();
  const classesSecond = useStylesSecond();
  const [openModal, setOpenModal] = useState(false);
  let history = useHistory();

  const handleOnClick = (productId) => {
    history.push(`/product-detail/${productId}`);
  };
  
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
  return (
    <div className="product-item"
      style={{
        ...style,
        marginLeft: marginLR,
        marginRight: marginLR,
        marginBottom: marginTB,
        marginTop: marginTB,
      }}
    >
      {
        isProductUser ?
          (
            <Card className={classesSecond.root}>
              <div className={classesSecond.details}>

                <CardMedia
                  component="img"
                  className={classesSecond.cover}
                  image={item.original}
                  title="Live from space album cover"
                />
                <CardContent>
                  <Typography gutterBottom component="h6">
                    {item.original}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="div" className='product-item-infor'>
                    <EuroCircleOutlined className="icon-coin" />
                    <div className="product-price">{item.original}</div>
                  </Typography>
                </CardContent>
              </div>

            </Card>
          )
          : (
            <Paper variant="outlined" className={classesFirst.root}  >
              <CardActionArea onClick={() => handleOnClick(item.id)}>
                <CardMedia
                  className={classesFirst.media}
                  image={getUrlImage(item.assets)}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom component="h6" className={classesFirst.productName} >
                    {item.toyName}
                  </Typography>
                  <TextTruncate
                    className={'description'}
                    line={3}
                    element="span"
                    truncateText="…"
                    text={item.description}
                  />
                  <Typography variant="body2" color="textSecondary" component="div" className='product-item-infor'>
                    <div className="price-section">
                      <LocalAtmTwoToneIcon className="icon-coin" />
                      <div className="product-price">{item.ecoin}</div>
                    </div>
                    <Typography variant="body2" color="textSecondary" component="div" className='product-item-createdDate'>
                      {/* <div className="product-createdDate">10 ngày trước</div> */}
                    </Typography>
                  </Typography>

                </CardContent>
               
              </CardActionArea>
              <CardActions className="btn-group">
                  {
                    true ? (
                      <Button size="small"
                        variant="contained"
                        className="btn request"
                        startIcon={<FavoriteTwoToneIcon />}
                        onClick={() => setOpenModal(true)}
                      >
                        Yêu cầu trao đổi
                      </Button>
                    ) : (
                        <Button className="btn sold" disabled variant="contained" startIcon={<SentimentVeryDissatisfiedIcon />}>
                          Đã bán
                        </Button>
                      )
                  }

                  <Button size="small" variant="contained" 
                  className="btn detail" onClick={() => handleOnClick(item.id)}>
                    Chi tiết
                 </Button>
                </CardActions>
            </Paper>
          )
      }
      <ModalUi open={openModal}
        onCancelClick={() => setOpenModal(false)}
        title={'Yêu cầu trao đổi'}
        content={'Bạn có thực sự muốn giao dịch đồ chơi này?'}
        labelDone="Yêu cầu"
      //onCancelClick={()=> setOpenModal(false)}
      />
    </div>
  );
}

ProductItem.propTypes = {};

export default ProductItem;
