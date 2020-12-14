/**
 *
 * ProductItem
 *
 */

import React, {useState} from 'react';
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

import './ProductItem.css';
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
 const [openModal,setOpenModal] = useState(false);
  const handleOnClick = () => {
    console.log('productitem');
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
            <Paper variant="outlined" className={classesFirst.root} onClick={handleOnClick} >
              <CardActionArea>
                <CardMedia
                  className={classesFirst.media}
                  image={item.original}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom component="h6" className={classesFirst.productName}>
                    toy 1
                  </Typography>
                  <TextTruncate
                    className={'description'}
                    line={3}
                    element="span"
                    truncateText="…"
                    text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when ssssan unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                  />
                  <Typography variant="body2" color="textSecondary" component="div" className='product-item-infor'>
                    <div className="price-section">
                      <LocalAtmTwoToneIcon className="icon-coin" />
                      <div className="product-price">10</div>
                    </div>
                    <Typography variant="body2" color="textSecondary" component="div" className='product-item-createdDate'>
                      <div className="product-createdDate">10 ngày trước</div>
                    </Typography>
                  </Typography>

                </CardContent>
                <CardActions className="btn-group">
                  {
                    true ? (
                      <Button size="small" 
                      variant="contained"
                       className="btn request" 
                       startIcon={<FavoriteTwoToneIcon />}
                       onClick={()=> setOpenModal(true)}
                       >
                        Yêu cầu trao đổi
                      </Button>
                    ) : (
                        <Button className="btn sold" disabled variant="contained" startIcon={<SentimentVeryDissatisfiedIcon />}>
                          Đã bán
                        </Button>
                      )
                  }

                  <Button size="small" variant="contained" className="btn detail">
                    Chi tiết
                 </Button>
                </CardActions>
              </CardActionArea>
            </Paper>
          )
      }
      <ModalUi open={openModal}
      onCancelClick={()=> setOpenModal(false)}
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
