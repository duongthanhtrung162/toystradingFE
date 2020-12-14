/**
 *
 * Login
 *
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { useSnackbar } from 'notistack';

import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as PageActions from './actions';
//component
import Button from '@material-ui/core/Button';
import './Login.css';
import TextFieldUi from '../../components/TextFieldUi/index.js';


export function Login(props) {
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let history = useHistory();


  const validationSchema = yup.object().shape({
    email: yup.string()
    .email('Nhập email chưa hợp lệ!')
    .required('Nhập email tài khoản'),    
    password: yup.string()
    .min(5, 'Mật khẩu tối thiểu 5 kí tự!')
     .max(10, 'Mật khẩu tối đa 10 kí tự!')
     .required('Nhập mật khẩu tài khoản')    
      
  });

  const formikStep = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }  ) => {
      const data = {
        "email" : values.email,
        "password" : values.password
      }
      props.login(data)
      .then((rs) => {
          if(rs.data.data.type === 1){
            history.push('/');
            enqueueSnackbar('Đăng nhập thành công', { 
              variant: 'success',
          });
          }else{
            history.push('/homeAdmin');
            enqueueSnackbar('đây là admin', { 
              variant: 'success',
          });
          }
       
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
    <div className="login-page-wrapper">
      <Grid container >
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6} className="form-main">
          <div className="title">
            Bạn chưa có tài khoản?
              <Link to="/register"><span> Đăng ký tài khoản</span></Link>
          </div>
          <div className="form-login">
            <form onSubmit={formikStep.handleSubmit}>
              <TextFieldUi
                type={'text'}
                label={'Email'}
                placeholder={'Email'}
                name="email"
                value={formikStep.values.email}
                  onBlur={formikStep.handleBlur}
                  errors={formikStep.errors.email}
                  touched={formikStep.touched.email}
                  error={formikStep.touched.email && Boolean(formikStep.errors.email)}
                onChange={formikStep.handleChange}
               
              />
              <TextFieldUi
                type={'password'}
                label={'Mật khẩu'}
                placeholder={'Mật khẩu'}
                name="password"
                value={formikStep.values.password}
                onChange={formikStep.handleChange}
                  onBlur={formikStep.handleBlur}
                  errors={formikStep.errors.password}
                  error={formikStep.touched.password && Boolean(formikStep.errors.password)}
                  touched={formikStep.touched.password}
                  onChange={formikStep.handleChange}
              />
              <div className="sub-title">
                Quên mật khẩu? Khôi phục <Link to="/forgotPassword">tại đây</Link>
              </div>
              <div className="btn-login">
                <Button className="btn-done" variant="contained" type="submit">
                  Đăng nhập
              </Button>
              </div>
            </form>
          </div>
        </Grid>
        <Grid item xs={3}>

        </Grid>
      </Grid>
    </div>
  );
}

Login.propTypes = {
  login: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    login: async (data) => {
      
      return new Promise((resolve, reject) => {
        
        return dispatch(PageActions.login({ resolve, reject, data }));
      })
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Login);
