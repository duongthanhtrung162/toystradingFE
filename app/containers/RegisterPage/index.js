/**
 *
 * RegisterPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import history from 'utils/history';
import { useSnackbar } from 'notistack';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectRegisterPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextFieldUi from '../../components/TextFieldUi/index';
import SelectFieldUi from '../../components/SelectFieldUi/index';
import './RegisterPage.css';

import * as PageActions from './actions';


export function RegisterPage(props) {
  useInjectReducer({ key: 'registerPage', reducer });
  useInjectSaga({ key: 'registerPage', saga });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const validationSchema = yup.object().shape({
    userName: yup.string()
      .required('Nhập tên tài khoản!'),
    email: yup.string()
      .email('Nhập email chưa hợp lệ!')
      .required('Nhập email tài khoản!'),
    phone: yup.string()
      .required('Nhập số điện thoại!'),
    password: yup.string()
      .min(5, 'Mật khẩu tối thiểu 5 kí tự!')
      .max(10, 'Mật khẩu tối đa 10 kí tự!')
      .required('Nhập mật khẩu tài khoản!')
  });
  
  const formikStep = useFormik({
    initialValues: {
      email: '',
      phone: '',
      userName: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      props.register(values)
        .then((rs) => {
            history.push('/');
            enqueueSnackbar('Check email để kích hoạt tài khoản', {
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
    <div className="register-page-wrapper">
      <Grid container >
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6} className="register-body">
          <div className="title">Đăng ký tài khoản</div>
          <form onSubmit={formikStep.handleSubmit}>
            <div className="form-register">
              <TextFieldUi
                type={'text'}
                label={'Tên'}
                name="userName"
                className="name"
                value={formikStep.values.userName}
                onChange={formikStep.handleChange}
                  onBlur={formikStep.handleBlur}
                  errors={formikStep.errors.userName}
                  error={formikStep.touched.userName && Boolean(formikStep.errors.userName)}
                  touched={formikStep.touched.userName}
                  onChange={formikStep.handleChange}
              />
              <TextFieldUi
                name="email"
                className="email"
                type={'text'}
                label={'Email'}
                value={formikStep.values.email}
                onBlur={formikStep.handleBlur}
                errors={formikStep.errors.email}
                touched={formikStep.touched.email}
                error={formikStep.touched.email && Boolean(formikStep.errors.email)}
              onChange={formikStep.handleChange}
              />
              <TextFieldUi
                name="phone"
                type={'number'}
                className="phone"
                label={'Số điện thoại'}
                value={formikStep.values.phone}
                onChange={formikStep.handleChange}
                  onBlur={formikStep.handleBlur}
                  errors={formikStep.errors.phone}
                  error={formikStep.touched.phone && Boolean(formikStep.errors.phone)}
                  touched={formikStep.touched.phone}
                  onChange={formikStep.handleChange}
              />
              <TextFieldUi
                name="password"
                className="password"
                type={'password'}
                label={'Mật khẩu'}
                value={formikStep.values.password}
                onChange={formikStep.handleChange}
                  onBlur={formikStep.handleBlur}
                  errors={formikStep.errors.password}
                  error={formikStep.touched.password && Boolean(formikStep.errors.password)}
                  touched={formikStep.touched.password}
                  onChange={formikStep.handleChange}
              />
            </div>
            <div className="btn-register">
              <Button className="btn-done" variant="contained" type="submit">
                Đăng ký
           </Button>
            </div>
          </form>
        </Grid>
        <Grid item xs={3}>
        </Grid>
      </Grid>
    </div>
  );
}

RegisterPage.propTypes = {
  register: PropTypes.func,

};

const mapStateToProps = createStructuredSelector({
  registerPage: makeSelectRegisterPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    register: async (data) => {
      return new Promise((resolve, reject) => {
        return dispatch(PageActions.register({ resolve, reject, data }));
      })
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(RegisterPage);
