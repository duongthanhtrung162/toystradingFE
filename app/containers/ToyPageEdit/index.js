/**
 *
 * ToyPageEdit
 *
 */

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectToyPageEdit from './selectors';
import makeSelectHeaderNew from '../HeaderNew/selectors';
import lodash from 'lodash';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Button from '@material-ui/core/Button';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import AppWrapper from '../../components/AppWrapper/index';
import MediumText from '../../components/MediumText/index';
import TextFieldUi from '../../components/TextFieldUi/index';
import SelectFieldUi from '../../components/SelectFieldUi/index';
import TextAreaField from '../../components/TextAreaField/index';
import Carousel from '../../components/Carousel/index';
import SelectOFTag from '../../components/SelectOFTag/index';
import * as PageActions from './actions';


import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

import './ToyEditPage.css';

export function ToyPageEdit(props) {
  useInjectReducer({ key: 'toyPageEdit', reducer });
  useInjectSaga({ key: 'toyPageEdit', saga });

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let history = useHistory();

  const [imagePreview, setImagePreview] = useState([]);
  const [imageNew, setImageNew] = useState([]);
  const uploadPhotoRef = useRef(null);
  let categoryList = props.headerNew.categoryList;
  let tagList = props.headerNew.tagList;
  console.log('imageeeeePreview',imagePreview);
  const getImageNew = (e) => {
    if (e.target.files) {
      // const fileArray = Array.from(e.target.files).map((file) => {
      //   let reader = new FileReader();
      //   debugger
      //  reader.readAsDataURL(file);
      //   return {'base64' : reader.result , 'url' : URL.createObjectURL(file) }
      // } );
      const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file) );
      console.log('urlllllll', e.target.files[0]);
      setImagePreview((preImage) => preImage.concat(fileArray))
      //fileArray.map((file) => setImagePreview([ ...imagePreview, file]))
    }
  };
  const renderImageNew = (source) => {
    return source.map((photo) => {
      return (<div className="product-image">
        <img src={photo} key={photo} />
        <DeleteIcon className="icon-delete" onClick={() => removeImagePreview(photo)} />
      </div>)
    })
  }
  const removeImagePreview = (photo) => {
    debugger
    let newArr = [...imagePreview]
    lodash.remove(newArr, function(e) {
      return e === photo;
  });
  console.log('newAr', newArr);
  setImagePreview(newArr);
  }

   const dropdownNavCity = [
    {
        value : 'Hồ Chí Minh' ,
        id : 'HCM' ,
    },
    {
        value : 'Hà Nội' ,
        id : 'HN' 
    },
    {
        value : 'Cần Thơ' ,
        id : 'CT' 
    },
    {
        value : 'Hải Phòng' ,
        id : 'HP' 
    },
    {
        value : 'Đà Nẵng' ,
        id : 'DN' 
    },
]
    
 const dropdownNavSex = [
    {
        value : 'Bé trai' ,
        id : 'trai' 
    },
    {
        value : 'Bé gái' ,
        id : 'gai' 
    }
]
const dropdownNavCondition = [
  {
      value : 'Còn mới' ,
      id : 'M' 
  },
  {
      value : 'Đã sử dụng' ,
      id : 'S' 
  }
]
 const dropdownNavAge = [
    {
        value : '0-12 tháng' ,
        id : '0' 
    },
    {
        value : '1-3 tuổi' ,
        id : '13' 
    },
    {
        value : '4-6 tuổi' ,
        id : '46' 
    },
    {
        value : '6-11 tuổi' ,
        id : '611'
    },
    {
        value : '12 tuổi trở lên' ,
        id : '12'
    }
]
  
  const validationSchema = yup.object().shape({
    toyName: yup.string()
    .required('Nhập tên đồ chơi'),  
    category: yup.number()
    .required('Chọn danh mục đồ chơi'), 
    ecoin: yup.number()
    .required('Nhập ecoin')
    .positive('Ecoin phải là số dương')
    .integer('Ecoin là số nguyên'), 
    age: yup.string()
    .required('Chọn độ tuổi'), 
    sex: yup.string()
    .required('Chọn giới tính'),
        
     
   
  });

  const formikStep = useFormik({
    enableReinitialize: true,
    initialValues: {
      toyName: '',
      category: '',
      ecoin: 0,
      age: '',
      sex: '',
      city : '',
      condition: '',
      description: '',
      tag: []
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }  ) => {
      console.log('valueeeee',values)
     props.addToy();
     
    }
  })


  
 
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
   
  ];

  return (
    <div className="toy-edit-page">
      <AppWrapper className="toy-edit-page wrapper">
        <MediumText mbNumber={0} className="header-page">
          Đồ chơi
         </MediumText>
        <div className="form-product">
        <form onSubmit={formikStep.handleSubmit}>
          <div className="form-section">
            <TextFieldUi
              name='toyName'
              label="Tên đồ chơi"
              placeholder='Tên đồ chơi'
              type="text"
              className="product-name"
              value={formikStep.values.toyName}
              onBlur={formikStep.handleBlur}
              errors={formikStep.errors.toyName}
              touched={formikStep.touched.toyName}
              error={formikStep.touched.toyName && Boolean(formikStep.errors.toyName)}
             onChange={formikStep.handleChange}
            />

          </div>
          <div className="form-section">
            <SelectFieldUi
              name='category'
              label="Danh mục"
              placeholder='Danh mục'
              isSelect
              options={categoryList}
              className="product-category"
              value={categoryList.find(option => option.id === formikStep.values.category)}
              onBlur={formikStep.handleBlur}
              errors={formikStep.errors.category}
              touched={formikStep.touched.category}
              error={formikStep.touched.category && Boolean(formikStep.errors.category)}
              onChange={(event, option) => {
                formikStep.setFieldValue('category', option.id);
              }}            
              />


          </div>
          <div className="form-section">
            <TextFieldUi
              name='ecoin'
              label="Ecoin"
              placeholder='Ecoin'
              type="number"
              className="product-price"
              InputProps={true}
              value={formikStep.values.ecoin}
              onBlur={formikStep.handleBlur}
              errors={formikStep.errors.ecoin}
              touched={formikStep.touched.ecoin}
              error={formikStep.touched.ecoin && Boolean(formikStep.errors.ecoin)}
              onChange={formikStep.handleChange}
            />
            <SelectFieldUi
              label={'Độ tuổi'}
              options={dropdownNavAge}
              name="age"
              className="product-age"
              value={dropdownNavAge.find(option => option.id === formikStep.values.age)}
              onBlur={formikStep.handleBlur}
              errors={formikStep.errors.age}
              touched={formikStep.touched.age}
              error={formikStep.touched.age && Boolean(formikStep.errors.age)}
              onChange={(event, option) => {
                
                formikStep.setFieldValue('age', option.id);
              }}      
            />
            <SelectFieldUi
              label={'Giới tính'}
              options={dropdownNavSex}
              name="sex"
              className="product-sex"
              value={dropdownNavSex.find(option => option.id === formikStep.values.sex)}
              onBlur={formikStep.handleBlur}
              errors={formikStep.errors.sex}
              touched={formikStep.touched.sex}
              error={formikStep.touched.sex && Boolean(formikStep.errors.sex)}
              onChange={(event, option) => {
                
                formikStep.setFieldValue('sex', option.id);
              }}      
            />
            <SelectFieldUi
              label={'Thành phố'}
              options={dropdownNavCity}
              name="city"
              className="product-city"
              value={dropdownNavCity.find(option => option.id === formikStep.values.city)}
              onBlur={formikStep.handleBlur}
              errors={formikStep.errors.city}
              touched={formikStep.touched.city}
              error={formikStep.touched.city && Boolean(formikStep.errors.city)}
              onChange={(event, option) => {
                formikStep.setFieldValue('city', option.id);
              }}      
            />
            <SelectFieldUi
              label={'Tình trạng'}
              options={dropdownNavCondition}
              name="condition"
              className="product-condition"
              value={dropdownNavCondition.find(option => option.id === formikStep.values.condition)}
              onBlur={formikStep.handleBlur}
              errors={formikStep.errors.condition}
              touched={formikStep.touched.condition}
              error={formikStep.touched.condition && Boolean(formikStep.errors.condition)}
              onChange={(event, option) => {
                formikStep.setFieldValue('condition', option.id);
              }}      
            />
          </div>
          <div className="form-section">
            {/* <TextFieldUi
              name='product-reference'
              label="Link tham khảo"
              placeholder='Link tham khảo'
              type="text"
              className="product-reference"
            /> */}
            <SelectOFTag
              name='tag'
              label="Tag"
              className="product-tag"
              options={tagList}
              value={formikStep.values.tag}
                
             // onBlur={formikStep.handleBlur}
//errors={formikStep.errors.tag}
             // touched={formikStep.touched.tag}
             onChange={(event, option) => {
              formikStep.setFieldValue('tag', option);
            }}     
            />
          </div>
          <div className="form-section">
            <TextAreaField
              name="description"
              className="product-description"
              placeholder="Mô tả sơ lược..."
              rowMin={10}
              value={formikStep.values.description}
              // onBlur={formikStep.handleBlur}
              // errors={formikStep.errors.description}
              // touched={formikStep.touched.description}
              // error={formikStep.touched.description && Boolean(formikStep.errors.description)}
              onChange={ (e) => {
                
                formikStep.setFieldValue('description', e.currentTarget.value);
              }}
              
            />
          </div>
          <div className="form-section">
            <Button
              className="btn-upload-photo"
              variant="contained"
              startIcon={<PhotoCameraIcon />}
              onClick={() => uploadPhotoRef.current.click()}
            >
              Hình ảnh
             </Button>

          </div>
          <input
            hidden
            multiple
            ref={uploadPhotoRef}
            type="file"
            accept="image/jpg,image/png"
            onChange={event => getImageNew(event)}
          />
          <Carousel
            marginBottom={20}
            hideArrow
            slidesToShow={5}
            slidesToScroll={1}
            items={renderImageNew(imagePreview)}
          />
          <div className="form-section btn">
            <Button
              className="btn-cancel"
              variant="contained"
              //onClick={() => uploadPhotoRef.current.click()}
            >
              Hủy bỏ
             </Button>
            <Button
              className="btn-save"
              variant="contained"
              startIcon={<SaveIcon />}
              type="submit"
            >
              Lưu
             </Button>

          </div>
              </form>
        </div>
      </AppWrapper>
    </div>
  );
}

ToyPageEdit.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  toyPageEdit: makeSelectToyPageEdit(),
  headerNew: makeSelectHeaderNew()
});

function mapDispatchToProps(dispatch) {
  return {
    addToy : async () => {
      return new Promise((resolve, reject) => {
        return dispatch(PageActions.addToy({ resolve, reject }));
      });
  }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ToyPageEdit);
