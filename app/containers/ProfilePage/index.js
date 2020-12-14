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
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';


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
import LargeText from '../../components/LargeText/index';
import TextFieldUi from '../../components/TextFieldUi/index';

const gender = [
  {
    value: 'Nam',
    label: 'Nam',
  },
  {
    value: 'Nữ',
    label: 'Nữ',
  },
]

export function ProfilePage() {
  useInjectReducer({ key: 'profilePage', reducer });
  useInjectSaga({ key: 'profilePage', saga });

  const [isEditting, setIsEditting] = useState(false);
  const uploadPhotoRef = useRef(null);
  const [imagePreview, setImagePreview] = useState('');
  const [image, setImg] = useState('');
  const getImagePreview = (e) => {
    if (e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      setImg(e.target.files[0]);
    }
  };
  useEffect(() => {
   console.log('profile');
  }, [])

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
                          Cá Nhân
                       </LargeText>
                        <div className="rate-wrapper">
                          <Rating name="read-only" value={3.5} readOnly precision={0.5} />
                        </div>
                      </div>
                      <div className="ecoin">
                        <LocalAtmTwoToneIcon className="icon-coin" />
                        <div className="ecoin-count">10</div>
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
                          <div>{'@mail' || '-'}</div>
                        </div>
                        <div className="info-item">
                          <div className="key">Số điện thoại</div>
                          <div>{'03030303' || '-'}</div>
                        </div>
                        <div className="info-item">
                          <div className="key">Giới tính</div>
                          <div>{'Nam' || '-'}</div>
                        </div>
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
                        <form className="editting-form">
                          <TextFieldUi
                            type={'text'}
                            label={'Email'}
                            value={'Trung@mgmailc.om'}
                            locked
                          />
                          <TextFieldUi
                            type={'text'}
                            label={'Tên'}
                            defaultValue={'Trung@mgmailc.om'}
                          />
                          <TextFieldUi
                            type={'number'}
                            label={'Số điện thoại'}
                            defaultValue={'77777'}
                          />
                          <TextFieldUi
                            isSelect
                            label={'Giới tính'}
                            options={gender}
                            defaultValue={'Nam'}
                          />
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
              <form className="form-change-password">
                <TextFieldUi
                  type={'password'}
                  label={'Mật khẩu cũ'}
                />
                <TextFieldUi
                  type={'password'}
                  label={'Mật khẩu mới'}
                />
                <div className="btn-form">
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
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

ProfilePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  profilePage: makeSelectProfilePage(),
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

export default compose(withConnect)(ProfilePage);
