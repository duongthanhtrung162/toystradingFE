/**
 *
 * PurchaseListPage
 *
 */

import React , {useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import InfiniteScroll from 'react-infinite-scroll-component';


import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectPurchaseListPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './PurchaseListPage.css';
import LargeText from '../../components/LargeText/index';
import AccordionUI from '../../components/AccordionUI/index';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useSnackbar } from 'notistack';
import * as PageActions from './actions';
import * as _ from 'lodash';
export function PurchaseListPage(props) {
  useInjectReducer({ key: 'purchaseListPage', reducer });
  useInjectSaga({ key: 'purchaseListPage', saga });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const listBuy  = props.purchaseListPage.listBuy;

  const onUpdateTrans = (id, text) => {
    const formData = new FormData();
    formData.append(`status`, text)
    props.updateTrans(id,formData)
    .then((rs) => {
       props.getListBuy();
       enqueueSnackbar('Thao tác thành công', {
        variant: 'success',
      });
    })
    .catch((err) => {
      if (err.response) {
        enqueueSnackbar(err.response.data.message, {
          variant: 'error',
        });
      }
    });
  }

  useEffect(() => {

    (async() => {
     await props.getListBuy();
     //setCategoryList(result.data.data.data); 
    })();
  }, []);
  return (
    <div className="purchase-page-wrapper">
      <LargeText mbNumber={20} style={{ textAlign: 'left', fontSize: '25px' }} className="product-name">
        Đã mua
      </LargeText>
      <Tabs>
        <TabList>
          <Tab>Tất cả</Tab>
          <Tab>Đang yêu cầu</Tab>
          <Tab>Giao dịch</Tab>
          <Tab>Kết thúc</Tab>
        </TabList>
        <TabPanel>
          <div className="list-wrapper">
            {
              _.isEmpty(listBuy) ? <div style={{fontSize:"20px"}}>Không có giao dịch</div>
              :
              listBuy.map((item,index) => {
                return (
                  <AccordionUI item={item} type="buy" 
                  updateTrans={onUpdateTrans}     
                  />
                )
              })


            }

          </div>
        </TabPanel>
        <TabPanel>
          <div className="list-wrapper">
          {
              _.isEmpty(listBuy) ? <div style={{fontSize:"20px"}}>Không có giao dịch</div>
              :
              listBuy.map((item,index) => {
                if(item.status === "REQUEST")
                {
                  return (
                    <AccordionUI item={item} type="buy" 
                    updateTrans={onUpdateTrans}     
                    />
                  )
                }
               
              })

            }
          </div>
        </TabPanel>
        <TabPanel>
        {
              _.isEmpty(listBuy) ? <div style={{fontSize:"20px"}}>Không có giao dịch</div>
              :
              listBuy.map((item,index) => {
                if(item.status === "ACCEPTED")
                {
                  return (
                    <AccordionUI item={item} type="buy" 
                    updateTrans={onUpdateTrans}     
                    />
                  )
                }
               
              })

            }
        </TabPanel>
        <TabPanel>
          <div className="list-wrapper">
          {
              _.isEmpty(listBuy) ? <div style={{fontSize:"20px"}}>Không có giao dịch</div>
              :
              listBuy.map((item,index) => {
                if(item.status === "DONE" || item.status === "CANCEL")
                {
                  return (
                    <AccordionUI item={item} type="buy" 
                    updateTrans={onUpdateTrans}     
                    />
                  )
                }
               
              })

            }
          </div>
        </TabPanel>
       
      </Tabs>
    </div>
  );
}

PurchaseListPage.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  purchaseListPage: makeSelectPurchaseListPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListBuy : async () => {
      return new Promise((resolve, reject) => {
        return dispatch(PageActions.getListBuy({ resolve, reject }));
      });
  },
  updateTrans : async (id,data) => {
    return new Promise((resolve, reject) => {
      return dispatch(PageActions.updateTrans({ resolve, reject,id,data }));
    });
},
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PurchaseListPage);
