/**
 *
 * MaterialTableUi
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import ClassNames from 'classnames';
import './MaterialTableUi.css';
import MUIDataTable from "mui-datatables";
import CustomToolBar from '../CustomToolBar/index'
import history from 'utils/history';
import routesLinks from '../../containers/App/routesLinks';


function MaterialTableUi(props) {
  const { title, filterType, className, columns, data, download, print } = props;
  const options = {
    filterType: filterType === 'dropdown' ? 'dropdown' : 'checkbox',
    download: download ? 'true' : 'false',
    print: print ? 'true' : 'false',
    expandableRowsOnClick: true,
    customToolbar: ({ displayData }) => {
      return (
        <CustomToolBar onClick={() => {
          history.push(
            routesLinks.dashboardPage+ '/toy/add' ,
          );
        }} />
      );
    },

    textLabels: {
      body: {
        noMatch: "Không có tìm thấy",
        toolTip: "Sắp xếp",
        columnHeaderTooltip: column => `Tìm kiếm ${column.label}`
      },
      pagination: {
        next: "Trang kế",
        previous: "Trang sau",
        rowsPerPage: "Số dòng",
        displayRows: "/",
      },
      toolbar: {
        search: "Tìm kiếm",
        downloadCsv: "Download CSV",
        print: "In",
        viewColumns: "Xem cột",
        filterTable: "Lọc",
      },
      filter: {
        all: "Tất cả",
        title: "LỌC",
        reset: "Reset",
      },
      viewColumns: {
        title: "Hiện tất cả",
        titleAria: "Hiện/Ẩn Cột",
      },
      selectedRows: {
        text: "Đồ chơi được chọn",
        delete: "Xóa",
        deleteAria: "Xóa tất cả",
      }

    }
  };
  return (
    <div className={ClassNames('table-wrapper', className)}>
      <MUIDataTable
        title={title}
        data={data}
        columns={columns}
        options={options}

      />
    </div>

  );
}

MaterialTableUi.propTypes = {};

export default MaterialTableUi;
