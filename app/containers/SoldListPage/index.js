/**
 *
 * SoldListPage
 *
 */

import React,  {useEffect}  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSoldListPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './SoldListPage.css';
import LargeText from '../../components/LargeText/index';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AccordionUI from '../../components/AccordionUI/index';
import { useSnackbar } from 'notistack';
import * as PageActions from './actions';
import * as _ from 'lodash';
export function SoldListPage(props) {
  useInjectReducer({ key: 'soldListPage', reducer });
  useInjectSaga({ key: 'soldListPage', saga });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const listSold  = props.soldListPage.listSold;
  
  const onUpdateTrans = (id, text) => {
    const formData = new FormData();
    formData.append(`status`, text)
    props.updateTrans(id,formData)
    .then((rs) => {
       props.getListSold();
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
  const onUpdateTransRate = (id, rate) => {
    const formData = new FormData();
    formData.append(`rate`, rate);
    formData.append(`transactionid`, id)

    props.updateTransRate(formData)
    .then((rs) => {
       props.getListSold();
       enqueueSnackbar('Đánh giá thành công', {
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
     await props.getListSold();
     //setCategoryList(result.data.data.data); 
    })();
  }, []);
  return (
    <div className="sold-page-wrapper">
       <LargeText mbNumber={20} style={{ textAlign: 'left', fontSize: '25px' }} className="product-name">
        Đã bán
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
              _.isEmpty(listSold) ? <div style={{fontSize:"20px"}}>Không có giao dịch</div>
              :
              listSold.map((item,index) => {
                return (
                  <AccordionUI item={item} type="sold" 
                  updateTrans={onUpdateTrans}
                  updateTransRate={onUpdateTransRate}      
     
                  />
                )
              })


            }

          </div>
        </TabPanel>
        <TabPanel>
        {
              _.isEmpty(listSold) ? <div style={{fontSize:"20px"}}>Không có giao dịch</div>
              :
              listSold.map((item,index) => {
                if(item.status === "REQUEST")
                {
                  return (
                    <AccordionUI item={item} type="sold" 
                    updateTrans={onUpdateTrans}  
                    updateTransRate={onUpdateTransRate}      
   
                    />
                  )
                }
               
              })

            }
        </TabPanel>
        <TabPanel>
          <div className="list-wrapper">
          {
              _.isEmpty(listSold) ? <div style={{fontSize:"20px"}}>Không có giao dịch</div>
              :
              listSold.map((item,index) => {
                if(item.status === "ACCEPTED")
                {
                  return (
                    <AccordionUI item={item} type="sold" 
                    updateTrans={onUpdateTrans} 
                    updateTransRate={onUpdateTransRate}      
    
                    />
                  )
                }
               
              })

            }
          </div>
        </TabPanel>
        <TabPanel>
          <div className="list-wrapper">
          {
              _.isEmpty(listSold) ? <div style={{fontSize:"20px"}}>Không có giao dịch</div>
              :
              listSold.map((item,index) => {
                if(item.status === "DONE" || item.status === "CANCEL")
                {
                  return (
                    <AccordionUI item={item} type="sold" 
                    updateTrans={onUpdateTrans}  
                    updateTransRate={onUpdateTransRate}      
   
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

SoldListPage.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  soldListPage: makeSelectSoldListPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListSold : async () => {
      return new Promise((resolve, reject) => {
        return dispatch(PageActions.getListSold({ resolve, reject }));
      });
  },
  updateTrans : async (id,data) => {
    return new Promise((resolve, reject) => {
      return dispatch(PageActions.updateTrans({ resolve, reject,id,data }));
    });
},
updateTransRate : async (data) => {
  return new Promise((resolve, reject) => {
    return dispatch(PageActions.updateTransRate({ resolve, reject,data }));
  });
}
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SoldListPage);
