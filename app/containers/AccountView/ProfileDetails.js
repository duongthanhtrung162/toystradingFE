import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import TextFieldUi from '../../components/TextFieldUi/index';
import * as PageActions from './actions';
import { clearAllLocalStorage } from '../../utils/helper';
import history from 'utils/history';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';



const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className,user,updateUser,updateInforUser, ...rest }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const validationSchema = yup.object().shape({
    userName: yup.string()
      .required('Nhập tên tài khoản!'),
    phone: yup.string()
      .required('Nhập số điện thoại!'),
  });
  const formikStep = useFormik({
    enableReinitialize: true,
    initialValues: {
      userName: user.userName ?  user.userName :  '',
      phone: user.phone ?  user.phone :  '',

    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      let  data =  {};
      if(upPhone === true && upName === true){
        
         data['userName'] = values.userName;
         data['phone'] = values.phone;
      }else {
        if(upName){
          
          data['userName'] = values.userName;

        }else{
          
          data['phone'] = values.phone;
        }
      }
      console.log(data);
      
      updateUser(data)
        .then((rs) => {
          updateInforUser(); 
           resetForm();
           setupdate(false);
           setupName(false);
           setupPhone(false);
           enqueueSnackbar('Cập nhật thành công', {
            variant: 'success',
          });
        })
        .catch((err) => {
          if (err.response) {
            updateInforUser(); 
           resetForm();
           setupdate(false);
           setupName(false);
           setupPhone(false);
            enqueueSnackbar(err.response.data.message, {
              variant: 'error',
            });
          }
        });

    }
  })
  const validationSchemaChangePass = yup.object().shape({
    newPassword: yup.string()
      .min(5, 'Mật khẩu tối thiểu 5 kí tự!')
      .max(10, 'Mật khẩu tối đa 10 kí tự!')
      .required('Nhập mật khẩu tài khoản!')
  });
  const formikStepChangePass = useFormik({
    enableReinitialize: true,
    initialValues: {
      newPassword: '',
    },
    validationSchema: validationSchemaChangePass,
    onSubmit: (values, { resetForm }) => {
      
      updateUser(values)
      .then( async (rs) => {
        await clearAllLocalStorage();
         history.push('/login');
         enqueueSnackbar('Cập nhật thành công', {
          variant: 'success',
        });
      })
      .catch((err) => {
        if (err.response) {
          updateInforUser(); 
         resetForm();
         setupdate(false);
         setupName(false);
         setupPhone(false);
          enqueueSnackbar(err.response.data.message, {
            variant: 'error',
          });
        }
      });

    }
  })
  const classes = useStyles();
  const [update, setupdate] = useState(false);
const [upName, setupName] = useState(false);
const [upPhone, setupPhone] = useState(false)
  const [changePass, setchangePass] = useState(false)


  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      {
        changePass ? (
          <Card>
             <form onSubmit={formikStepChangePass.handleSubmit}>
            <CardHeader
              subheader="Mẩu khẩu có thể thay đổi"
              title="Mật khẩu"
            />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextFieldUi
                    name="newPassword"
                    className="password"
                    type={'password'}
                    label={'Mật khẩu mới'}
                    value={formikStepChangePass.values.newPassword}
                    onChange={formikStepChangePass.handleChange}
                    onBlur={formikStepChangePass.handleBlur}
                    errors={formikStepChangePass.errors.newPassword}
                    error={formikStepChangePass.touched.newPassword && Boolean(formikStepChangePass.errors.newPassword)}
                    touched={formikStepChangePass.touched.newPassword}
                    onChange={
                      (e) => {
                        formikStepChangePass.handleChange(e)
                      }
                    }
                  />
                </Grid>

              </Grid>
            </CardContent>
            <Divider />
            <Box
              display="flex"
              justifyContent="space-between"
              p={2}
            >
              <Button
              onClick={() => setchangePass(false)}
                color="second"
                variant="contained"
              >
                Đổi thông tin
          </Button>
              <Button
                color="primary"
                variant="contained"
                type="submit"
              >
                Lưu mật khẩu
          </Button>
            </Box>
            </form>
          </Card>
        ) : (
            <Card>
              <form onSubmit={formikStep.handleSubmit}>
              <CardHeader
                subheader="Thông tin có thể chỉnh sửa"
                title="Thông tin"
              />
              <Divider />
              <CardContent>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
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
                      onChange={
                        (e) => {
                          formikStep.handleChange(e);
                          setupdate(true);
                          setupName(true);
                        }
                      }
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
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
                      onChange={
                        (e) => {
                          formikStep.handleChange(e);
                          setupdate(true);
                          setupPhone(true);
                        }
                      }
                    />
                  </Grid>


                </Grid>
              </CardContent>
              <Divider />
              <Box
                display="flex"
                justifyContent="space-between"
                p={2}
              >
                <Button
                  color="second"
                  variant="contained"

                  onClick={() => setchangePass(true)}
                >
                  Đổi mật khẩu
          </Button>
          {
            update &&  <Button
            type="submit"
              color="primary"
              variant="contained"
            >
              Lưu thông tin
      </Button>
          }
               
              </Box>
              </form>
            </Card>
          )
      }

    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
