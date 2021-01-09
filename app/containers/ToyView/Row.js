import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import LocalAtmTwoToneIcon from '@material-ui/icons/LocalAtmTwoTone';

import { Button } from '@material-ui/core';
const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const renderCity = (city) => {
        switch (city) {
            case "HN":
                return "Hà Nội";
            case "HCM":
                return "Hồ Chí Minh";
            case "CT":
                return "Cần Thơ";
            case "HP":
                return "Hải Phòng";
            case "DN":
                return "Đà Nẵng";

            default:
                return "";
        }
    }
    const renderAge = (age) => {
        switch (age) {
            case "0":
                return "0-12 tháng";
            case "13":
                return "1-3 tuổi";
            case "46":
                return "Cần Thơ";
            case "4-6 tuổi":
                return "6-11 tuổi";
            case "12":
                return "12 tuổi trở lên";
            default:
                return "";
        }
    }

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" style={{color : 'blue', fontWeight: 'bolder'}}>
                    {row.toyName}
                </TableCell>
                <TableCell >
                    {moment(row.createdAt).format('DD/MM/YYYY')}

                </TableCell >
                <TableCell   >
                    <div className={`status ${row.status === "READY" ? 'request' : (row.status === "SOLD" ? 'cancel' : 'accepted')}`}>
                        <span className="icon-status"></span>
                        {row.status === "READY" ? 'sẵn sàng' : (row.status === "SOLD" ? 'đã bán' : 'đang giao dịch')}
                    </div>

                </TableCell>

                <TableCell >
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.Button}
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                            props.handleDelete(row.id);
                        }}
                    >
                        Xóa
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Thông tin
                          </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableRow>
                                    <TableCell variant="head" className="header-title">Ecoin</TableCell>
                                    <TableCell>
                                        <LocalAtmTwoToneIcon className="icon-coin" style={{ color: 'yellow' }} />
                                        {row.ecoin}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" className="header-title">Giới tính</TableCell>
                                    <TableCell>{
                                        row.sex === "trai" ? "Bé trai" : "Bé gái"
                                    }</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" className="header-title">Độ tuổi</TableCell>
                                    <TableCell>{
                                        renderAge(row.age)
                                    }</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" className="header-title">Khu vực</TableCell>
                                    <TableCell>{
                                        renderCity(row.city)
                                    }</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" className="header-title">Tình trạng</TableCell>
                                    <TableCell>{
                                        row.condition === "M" ? "Còn mới" : "Đã sử dụng"
                                    }</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" className="header-title">Mô tả</TableCell>
                                    <TableCell>{
                                        row.description
                                    }</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" className="header-title">Từ khóa</TableCell>
                                    <TableCell>{row.tag_toys.length > 0 && row.tag_toys.map((tagItem, index) => {
                                        return (
                                            <Chip
                                                label={tagItem.tag}
                                                className="tag-name"
                                            />
                                        )
                                    })}</TableCell>
                                </TableRow>
                            </Table>
                        </Box>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Hình ảnh
                          </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableRow>
                                    {row.assets.length > 0 ? row.assets.map((item, index) =>{
                                        return <img style={{margin: '5px', width: '250px', height: '250px'}} src={item.url} />
                                    }) : <div></div>
                                }
                                  
                                
                                </TableRow>
                               
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
export default Row;

