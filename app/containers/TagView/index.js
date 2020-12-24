/**
 *
 * TagView
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useSnackbar } from 'notistack';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectTagView from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as PageActions from './actions';

import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from '../AccountView/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextFieldUi from '../../components/TextFieldUi/index';
import SaveIcon from '@material-ui/icons/Save';
import './TagView.css';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

export function TagView(props) {
  useInjectReducer({ key: 'tagView', reducer });
  useInjectSaga({ key: 'tagView', saga });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const tagList = props.tagView.tagList;

  const [tagItem, setTagItem] = useState({id: 0, value : ''})
  const [editting, setEditting] = useState(false)
  const [creatting, setCreatting] = useState(false)
  const validationSchema = yup.object().shape({
    value: yup.string()
      .required('Nhập tên tag!'),

  });
  const formikStep = useFormik({
    enableReinitialize: true,
    initialValues: {
      value: creatting ? '': tagItem.value,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      if(creatting === true ){
        props.createTag(values)
        .then((rs) => {
          setEditting(false);
          setCreatting(false);
          resetForm();
          enqueueSnackbar('Thao tác thành công', {
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
      }else{
        props.updateTag(tagItem.id,values)
        .then((rs) => {
          setEditting(false);
          resetForm();
          enqueueSnackbar('Thao tác thành công', {
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
      

    }
  })
  const deleteItem = (id) => {
    props.deleteTag(id)
    .then((rs) => {
      props.getTagList();
      enqueueSnackbar('Xóa thành công', {
        variant: 'success',
      });
    }
    )
    .catch((err)=> {
    }
    )
  }
  const create = () => {
    setTagItem({id: 0, value : ''})
    setCreatting(true);
    setEditting(true);
  }
  const editItem = (id,value) => {
    setTagItem({id: id, value : value})
    setEditting(true);
  }

  useEffect(() => {
    (async() => {
     await   props.getTagList();
     //setCategoryList(result.data.data.data); 
    })();
  }, [editting]);
  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        
      {
          editting ? <div className="categoryView-title">Tag</div>
          :
          <Toolbar createTag={create} />

        }
        <Box mt={3}>
        {
            editting ?
              <div className="form-categoryView">
                <form onSubmit={formikStep.handleSubmit}>
                  <TextFieldUi
                    label={'Tag'}
                    placeholder={'Tag'}
                    name="value"
                    type={'text'}
                    value={formikStep.values.value}
                    onBlur={formikStep.handleBlur}
                    errors={formikStep.errors.value}
                    touched={formikStep.touched.value}
                    error={formikStep.touched.value && Boolean(formikStep.errors.value)}
                    onChange={formikStep.handleChange}
                  ></TextFieldUi>
                  <div className="form-section btn">
                    <Button
                      className="btn-cancel"
                      variant="contained"
                      onClick={() => {
                        setEditting(false);
                        setCreatting(false);
                        formikStep.resetForm();
                      }
                        }
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
              :
              <Results tagList={tagList} handleDelete={deleteItem}
                handleEdit={editItem}
              />
          }
        </Box>
      </Container>
    </Page>
  );
}

TagView.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  tagView: makeSelectTagView(),
});

function mapDispatchToProps(dispatch) {
  return {
    getTagList : async () => {
      return new Promise((resolve, reject) => {
        return dispatch(PageActions.getTagList({ resolve, reject }));
      });
  },
  deleteTag : async (data) => {
    return new Promise((resolve, reject) => {
      return dispatch(PageActions.deleteTag({ resolve, reject,data }));
    });
},
createTag: async (data) => {
  return new Promise((resolve, reject) => {
    return dispatch(PageActions.createTag({ resolve, reject, data }));
  });
},
updateTag: async (id,value) => {
  return new Promise((resolve, reject) => {
    return dispatch(PageActions.updateTag({ resolve, reject, id,value }));
  });
},
  }
  };


const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TagView);
