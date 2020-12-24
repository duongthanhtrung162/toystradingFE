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
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import history from 'utils/history';

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
import * as PageActions from './actions';

export function ForgotPassword(props) {
  useInjectReducer({ key: 'forgotPassword', reducer });
  useInjectSaga({ key: 'forgotPassword', saga });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const validationSchema = yup.object().shape({
    email: yup.string()
      .email('Nhập email chưa hợp lệ!'),
      newPassword: yup.string()
      .min(5, 'Mật khẩu tối thiểu 5 kí tự!')
      .max(10, 'Mật khẩu tối đa 10 kí tự!')
      .required('Nhập mật khẩu tài khoản!')
  });

  const formikStep = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      props.restartPassword(values)
        .then((rs) => {
          history.push('/login');
          enqueueSnackbar('Check email để xác thực mật khẩu mới', {
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
  })

  return (
    <div className="forgotPassword-page-wrapper">
      <AppWrapper >
        <div className="title">
          Nhập địa chỉ email của bạn và chúng tôi sẽ gởi cho bạn một liên kết để đặt lại mật khẩu của bạn.
        </div>
        <div>
          <form onSubmit={formikStep.handleSubmit}>

            <div>
              <TextFieldUi
                label={'Email'}
                placeholder={'Email'}
                name="email"
                type={'text'}
                value={formikStep.values.email}
                onBlur={formikStep.handleBlur}
                errors={formikStep.errors.email}
                touched={formikStep.touched.email}
                error={formikStep.touched.email && Boolean(formikStep.errors.email)}
              onChange={formikStep.handleChange}
              >
              </TextFieldUi>
              <TextFieldUi
                name="newPassword"
                className="password"
                type={'password'}
                label={'Mật khẩu mới'}
                value={formikStep.values.newPassword}
                onChange={formikStep.handleChange}
                onBlur={formikStep.handleBlur}
                errors={formikStep.errors.newPassword}
                error={formikStep.touched.newPassword && Boolean(formikStep.errors.newPassword)}
                touched={formikStep.touched.newPassword}
                onChange={formikStep.handleChange}
              />
            </div>
            <div className="btn-page">
              <Link to="/login">
                <Button variant="contained" className="btn cancel">
                  Quay lại
              </Button>
              </Link>
              <Button variant="contained" type="submit" className="btn done">
                Đặt lại mật khẩu
              </Button>

            </div>
          </form>
        </div>
      </AppWrapper>

    </div>
  );
}

ForgotPassword.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  forgotPassword: makeSelectForgotPassword(),
});

function mapDispatchToProps(dispatch) {
  return {
    restartPassword: async (data) => {
      return new Promise((resolve, reject) => {
        return dispatch(PageActions.restartPassword({ resolve, reject, data }));
      })
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ForgotPassword);
