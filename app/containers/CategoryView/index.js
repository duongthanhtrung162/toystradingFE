/**
 *
 * CategoryView
 *
 */

import React, { useState, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useSnackbar } from 'notistack';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCategoryView from './selectors';
import reducer from './reducer';
import saga from './saga';
import makeSelectHeaderNew from '../HeaderNew/selectors';
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
import './CategoryView.css';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

export function CategoryView(props) {
  useInjectReducer({ key: 'categoryView', reducer });
  useInjectSaga({ key: 'categoryView', saga });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  let categoryList = props.categoryView.categoryList;
  const [categoryItem, setCategoryItem] = useState({id: 0, value : ''})
  const [editting, setEditting] = useState(false)
  const [creatting, setCreatting] = useState(false)
  const classes = useStyles();
  const validationSchema = yup.object().shape({
    value: yup.string()
      .required('Nhập danh mục!'),

  });
  const formikStep = useFormik({
    enableReinitialize: true,

    initialValues: {
      value: creatting ? '': categoryItem.value,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      if(creatting === true ){
        props.createCategory(values)
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
        props.updateCategory(categoryItem.id,values)
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
    props.deleteCategory(id)
      .then((rs) => {
        props.getCategoryList();
        enqueueSnackbar('Xóa thành công', {
          variant: 'success',
        });
      }
      )
      .catch((err) => {
      }
      )
  }

  const create = () => {
    setCategoryItem({id: 0, value : ''})
    setCreatting(true);
    setEditting(true);
  }
  const editItem = (id,value) => {
    setCategoryItem({id: id, value : value})
    setEditting(true);

  }
  useEffect(() => {
    (async () => {
      await props.getCategoryList();
    })();
  }, [editting]);

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        {
          editting ? <div className="categoryView-title">Danh mục</div>
          :
          <Toolbar createCategory={create} />


        }
        <Box mt={3}>
          {
            editting ?
              <div className="form-categoryView">
                <form onSubmit={formikStep.handleSubmit}>
                  <TextFieldUi
                    label={'Danh mục'}
                    placeholder={'Danh mục'}
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
              <Results categoryList={categoryList} handleDelete={deleteItem}
                handleEdit={editItem}
              />
          }

        </Box>
      </Container>
    </Page>
  );
}

CategoryView.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  categoryView: makeSelectCategoryView(),

});

function mapDispatchToProps(dispatch) {
  return {
    getCategoryList: async () => {
      return new Promise((resolve, reject) => {
        return dispatch(PageActions.getCategoryList({ resolve, reject }));
      });
    },
    deleteCategory: async (data) => {
      return new Promise((resolve, reject) => {
        return dispatch(PageActions.deleteCategory({ resolve, reject, data }));
      });
    },
    createCategory: async (data) => {
      return new Promise((resolve, reject) => {
        return dispatch(PageActions.createCategory({ resolve, reject, data }));
      });
    },
    updateCategory: async (id,value) => {
      return new Promise((resolve, reject) => {
        return dispatch(PageActions.updateCategory({ resolve, reject, id,value }));
      });
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CategoryView);
