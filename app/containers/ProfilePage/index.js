/**
 *
 * ProfilePage
 *
 */

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';


import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectProfilePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './ProfilePage.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Image } from 'antd';
import Rating from '@material-ui/lab/Rating';
import LocalAtmTwoToneIcon from '@material-ui/icons/LocalAtmTwoTone';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
//component
import { useSnackbar } from 'notistack';

import LargeText from '../../components/LargeText/index';
import TextFieldUi from '../../components/TextFieldUi/index';
import * as PageActions from './actions';
import { clearAllLocalStorage } from '../../utils/helper';
import history from 'utils/history';
import { useFormik } from 'formik';
import * as yup from 'yup';
// const gender = [
//   {
//     value: 'Nam',
//     label: 'Nam',
//   },
//   {
//     value: 'Nữ',
//     label: 'Nữ',
//   },
// ]

export function ProfilePage(props) {
  useInjectReducer({ key: 'profilePage', reducer });
  useInjectSaga({ key: 'profilePage', saga });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [isEditting, setIsEditting] = useState(false);
  const uploadPhotoRef = useRef(null);
  const [imagePreview, setImagePreview] = useState('');
  const [image, setImg] = useState('');

  const user = props.profilePage.user;

  const getImagePreview = (e) => {
    if (e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      setImg(e.target.files[0]);
    }
  };
  const validationSchema = yup.object().shape({
    userName: yup.string()
      .required('Nhập tên tài khoản!'),
    phone: yup.string()
      .required('Nhập số điện thoại!'),
  });
  const formikStep = useFormik({
    enableReinitialize: true,
    initialValues: {
      userName: user.userName ? user.userName : '',
      phone: user.phone ? user.phone : '',
      email: user.email ? user.email : ''

    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      let data = {};
      data['userName'] = values.userName;
      data['phone'] = values.phone;


      props.updateUser(data)
        .then((rs) => {

          setIsEditting(false);
          resetForm();
          enqueueSnackbar('Cập nhật thành công', {
            variant: 'success',
          });
        })
        .catch((err) => {
          if (err.response) {
            resetForm();
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

      props.updateUser(values)
        .then(async (rs) => {
          await clearAllLocalStorage();
          history.push('/login');
          enqueueSnackbar('Đăng nhập với mật khẩu mới', {
            variant: 'success',
          });
        })
        .catch((err) => {
          if (err.response) {
            resetForm();
            enqueueSnackbar(err.response.data.message, {
              variant: 'error',
            });
          }
        });

    }
  })
  useEffect(() => {
    (async () => {
      await props.getUser();
      //setCategoryList(result.data.data.data); 
    })();
  }, [isEditting]);

  return (
    <div>
      <Helmet>
        <title>ProfilePage</title>
        <meta name="description" content="Description of ProfilePage" />
      </Helmet>
      <div className="profile-page-wrapper">
        <LargeText mbNumber={20} style={{ textAlign: 'left', fontSize: '25px' }} className="product-name">
          Cá Nhân
      </LargeText>
        <Tabs>
          <TabList>
            <Tab>Thông tin tài khoản</Tab>
            <Tab>Thay đổi mật khẩu</Tab>
          </TabList>
          <TabPanel>
            <div className="personal-info-wrapper">

              {
                !isEditting ? (
                  <>
                    <div className="left-column-wrapper">
                      <div className="avatar-wrapper">
                        <Image
                          preview={false}
                          src='https://picsum.photos/id/1019/250/150/'
                        />
                      </div>
                    </div>
                    <div className="right-column-wrapper">
                      <div className="user-name-wrapper">
                        <LargeText mbNumber={0} style={{ textAlign: 'left' }} className="product-name">
                          {user.userName}
                        </LargeText>
                        <div className="rate-wrapper">
                          <Rating name="read-only" value={user.rate} readOnly precision={0.5} />
                        </div>
                      </div>
                      <div className="ecoin">
                        <LocalAtmTwoToneIcon className="icon-coin" />
                        <div className="ecoin-count">{user.ecoin}</div>
                      </div>
                      <div className="btn-edit">
                        <Button
                          variant="contained"
                          onClick={() => setIsEditting(true)}
                          startIcon={<EditIcon />}
                        >
                          Chỉnh sửa
                        </Button>
                      </div>
                      <div className="main-info-wrapper">
                        <div className="info-item">
                          <div className="key">E-mail </div>
                          <div>{user.email}</div>
                        </div>
                        <div className="info-item">
                          <div className="key">Số điện thoại</div>
                          <div>{user.phone}</div>
                        </div>
                        {/* <div className="info-item">
                          <div className="key">Giới tính</div>
                          <div>{'Nam' || '-'}</div>
                        </div> */}
                      </div>
                    </div>
                  </>
                ) : (
                    <>
                      <div className="left-column-wrapper">
                        <div className="avatar-wrapper">
                          <Image
                            preview={false}
                            src={imagePreview.length !== 0 ? imagePreview : 'https://picsum.photos/id/1019/250/150/'}
                          />

                          <div
                            className="btn-upload-photo"
                            onClick={() => uploadPhotoRef.current.click()}
                          >
                            Upload
                       </div>
                        </div>
                        <div className="support-formats-text">
                          JPG hoặc PNG file
                      </div>
                        <input
                          hidden
                          ref={uploadPhotoRef}
                          type="file"
                          accept="image/jpg,image/png"
                          onChange={event => getImagePreview(event)}
                        />
                      </div>
                      <div className="right-column-wrapper">
                        <form className="editting-form" onSubmit={formikStep.handleSubmit}>
                          <TextFieldUi
                            type={'text'}
                            label={'Email'}
                            name="email"
                            value={formikStep.values.email}
                            onChange={formikStep.handleChange}
                            onBlur={formikStep.handleBlur}
                            errors={formikStep.errors.email}
                            error={formikStep.touched.email && Boolean(formikStep.errors.email)}
                            touched={formikStep.touched.email}
                            locked
                          />
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

                              }
                            }
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
                            onChange={
                              (e) => {
                                formikStep.handleChange(e);
                              }
                            }
                          />
                          {/* <TextFieldUi
                            isSelect
                            label={'Giới tính'}
                            options={gender}
                            defaultValue={'Nam'}
                          /> */}
                          <div className="btn-form">
                            <Button variant="contained"
                              className="btn-cancel"
                              onClick={() => setIsEditting(false)}
                            >
                              Hủy bỏ
                             </Button>
                            <Button
                              className="btn-save"
                              variant="contained"
                              type="submit"
                              //onClick={() => setIsEditting(true)}
                              startIcon={<SaveIcon />}
                            >
                              Lưu
                           </Button>
                          </div>
                        </form>



                      </div>
                    </>
                  )
              }
            </div>
          </TabPanel>
          <TabPanel>
            <div className="change-password-wrapper">
              <form className="form-change-password" onSubmit={formikStepChangePass.handleSubmit}>
                {/* <TextFieldUi
                  type={'password'}
                  label={'Mật khẩu cũ'}
                /> */}
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
                <div className="btn-form">
                  <Button
                    className="btn-save"
                    variant="contained"
                    type="submit"
                    //onClick={() => setIsEditting(true)}
                    startIcon={<SaveIcon />}
                  >
                    Lưu mật khẩu
                           </Button>
                </div>
              </form>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

ProfilePage.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  profilePage: makeSelectProfilePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUser: async () => {
      return new Promise((resolve, reject) => {
        return dispatch(PageActions.getUser({ resolve, reject }));
      });
    },
    updateUser: async (data) => {
      return new Promise((resolve, reject) => {
        return dispatch(PageActions.updateUser({ resolve, reject, data }));
      });
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ProfilePage);
