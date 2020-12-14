/**
 *
 * PurchaseListPage
 *
 */

import React from 'react';
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

export function PurchaseListPage() {
  useInjectReducer({ key: 'purchaseListPage', reducer });
  useInjectSaga({ key: 'purchaseListPage', saga });

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
        <AccordionUI />
        <AccordionUI />

          </div>
        </TabPanel>
        <TabPanel>
          <div className="list-wrapper">
          <InfiniteScroll
                  // dataLength={shippedOrders.length}
                  // next={() => dispatch(actions.getShippedOrders(paramsShipped))}
                  // hasMore={!isEndShipped}
                  // loader={<LoadingMore isSimpleLoading />}
                  // scrollThreshold={1}
                >
                  </InfiniteScroll>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="list-wrapper">

          </div>
        </TabPanel>
        <TabPanel>
          <div className="list-wrapper">

          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

PurchaseListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  purchaseListPage: makeSelectPurchaseListPage(),
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

export default compose(withConnect)(PurchaseListPage);
