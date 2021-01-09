import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIcon from '@material-ui/icons/Phone';
import TabletIcon from '@material-ui/icons/Tablet';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const TrafficByDevice = ({ className,countTransStatus, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
const getData= (count) => {
  const data = {
    datasets: [
      {
        data: [count.request, count.accepted, count.cancel, count.done],
        backgroundColor: [
          colors.orange[600],
          colors.blue[500],
          colors.red[600],
          colors.deepPurple[200]
          
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Đang yêu cầu', 'Đồng ý', 'Hủy bỏ','Hoàn tất']
  }
  return data;
}
 ;

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const getDevices = (count) => {
    const   devices = [
      {
        title: 'Đang yêu cầu',
        value: count.request,
        icon: LaptopMacIcon,
        color: colors.orange[600]
      },
      {
        title: 'Đồng ý',
        value: count.accepted,
        icon: TabletIcon,
        color: colors.blue[600]
      },
      {
        title: 'Hủy bỏ',
        value: count.cancel,
        icon: PhoneIcon,
        color: colors.red[600]
      },
      {
        title: 'Hoàn tất',
        value: count.done,
        icon: PhoneIcon,
        color:  colors.deepPurple[200]
      }
    ];
    return devices;
  }


  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Giao dịch" />
      <Divider />
      <CardContent>
        <Box
          height={300}
          position="relative"
        >
          <Doughnut
            data={getData(countTransStatus)}
            options={options}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          mt={2}
        >
          {getDevices(countTransStatus).map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              p={1}
              textAlign="center"
            >
              {/* <Icon color="action" /> */}
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h2"
              >
                {value}
                
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

TrafficByDevice.propTypes = {
  className: PropTypes.string
};

export default TrafficByDevice;
