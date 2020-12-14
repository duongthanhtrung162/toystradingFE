/**
 *
 * ToyPageEdit
 *
 */

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectToyPageEdit from './selectors';
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


import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

import './ToyEditPage.css';

export function ToyPageEdit() {
  useInjectReducer({ key: 'toyPageEdit', reducer });
  useInjectSaga({ key: 'toyPageEdit', saga });
  const [imagePreview, setImagePreview] = useState([]);
  const [imageNew, setImageNew] = useState([]);
  const uploadPhotoRef = useRef(null);

  const getImageNew = (e) => {

    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      console.log('url', fileArray);
      setImagePreview((preImage) => preImage.concat(fileArray))
      //fileArray.map((file) => setImagePreview([ ...imagePreview, file]))
    }
  };
  const renderImageNew = (source) => {
    return source.map((photo) => {
      return (<div className="product-image">
        <img src={photo} key={photo} />
        <DeleteIcon className="icon-delete" />
      </div>)
    })
  }
  const gender = [
    {
      value: 'Bé gái',
      label: 'Bé gái',
    },
    {
      value: 'Bé trai',
      label: 'Bé trai',
    },
  ]
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
    { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
  ];

  return (
    <div className="toy-edit-page">
      <AppWrapper className="toy-edit-page wrapper">
        <MediumText mbNumber={0} className="header-page">
          Đồ chơi
         </MediumText>
        <div className="form-product">
          <div className="form-section">
            <TextFieldUi
              name='product-name'
              label="Tên đồ chơi"
              placeholder='Tên đồ chơi'
              type="text"
              className="product-name"
            />

          </div>
          <div className="form-section">
            <SelectFieldUi
              name='product-category'
              label="Danh mục"
              placeholder='Danh mục'
              isSelect
              options={gender}
              value={'Bé trai'}
              className="product-category"
            />


          </div>
          <div className="form-section">
            <TextFieldUi
              name='product-price'
              label="Ecoin"
              placeholder='Ecoin'
              type="number"
              className="product-price"
              InputProps={true}
              onChange={(event) => {
                if (event.target.value > 50)
                  event.preventDefault();
              }}
            />
            <SelectFieldUi

              label={'Độ tuổi'}
              options={gender}
              value={'Bé trai'}
              name="product-age"
              className="product-age"
            />
            <SelectFieldUi

              label={'Giới tính'}
              options={gender}
              value={'Bé trai'}
              name="product-sex"
              className="product-sex"
            />
            <SelectFieldUi

              label={'Thành phố'}
              options={gender}
              value={'Bé trai'}
              name="product-city"
              className="product-city"
            />

            <SelectFieldUi

              label={'Tình trạng'}
              options={gender}
              value={'Bé trai'}
              name="product-condition"
              className="product-condition"
            />
          </div>
          <div className="form-section">
            <TextFieldUi
              name='product-reference'
              label="Link tham khảo"
              placeholder='Link tham khảo'
              type="text"
              className="product-reference"
            />
            <SelectOFTag
              name='product-tag'
              label="Tag"
              className="product-tag"
              options={top100Films}
            />
          </div>
          <div className="form-section">
            <TextAreaField
              name="product-description"
              className="product-description"
              placeholder="Mô tả sơ lược..."
              rowMin={10}
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
              //onClick={() => uploadPhotoRef.current.click()}
            >
              Lưu
             </Button>

          </div>

        </div>
      </AppWrapper>
    </div>
  );
}

ToyPageEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  toyPageEdit: makeSelectToyPageEdit(),
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

export default compose(withConnect)(ToyPageEdit);
