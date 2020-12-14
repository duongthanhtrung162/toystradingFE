/**
 *
 * SoldListPage
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
import makeSelectSoldListPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './SoldListPage.css';
import LargeText from '../../components/LargeText/index';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export function SoldListPage() {
  useInjectReducer({ key: 'soldListPage', reducer });
  useInjectSaga({ key: 'soldListPage', saga });

  return (
    <div className="sold-page-wrapper">
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
        <TabPanel>
          <div className="list-wrapper">

          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

SoldListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  soldListPage: makeSelectSoldListPage(),
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

export default compose(withConnect)(SoldListPage);
