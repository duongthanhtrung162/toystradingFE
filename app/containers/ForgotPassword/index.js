/**
 *
 * ForgotPassword
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectForgotPassword from './selectors';
import reducer from './reducer';
import saga from './saga';
import { Link } from 'react-router-dom';

import './ForgotPassword.css';
import Button from '@material-ui/core/Button';
import TextFieldUi from '../../components/TextFieldUi/index';
import AppWrapper from '../../components/AppWrapper/index';

export function ForgotPassword() {
  useInjectReducer({ key: 'forgotPassword', reducer });
  useInjectSaga({ key: 'forgotPassword', saga });

  return (
    <div className="forgotPassword-page-wrapper">
      <AppWrapper >
        <div className="title">
          Nhập địa chỉ email của bạn và chúng tôi sẽ gởi cho bạn một liên kết để đặt lại mật khẩu của bạn.
      </div>
        <div>
          <TextFieldUi
            label={'Email'}
            placeholder={'Email'}
          >
          </TextFieldUi>
        </div>
        <div className="btn-page">
          <Link to="/login">
            <Button variant="contained" className="btn cancel">
              Quay lại
        </Button>
          </Link>
          <Button variant="contained" className="btn done">
            Đặt lại mật khẩu
        </Button>

        </div>
      </AppWrapper>

    </div>
  );
}

ForgotPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  forgotPassword: makeSelectForgotPassword(),
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

export default compose(withConnect)(ForgotPassword);
