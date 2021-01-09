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
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIcon from '@material-ui/icons/Phone';
import TabletIcon from '@material-ui/icons/Tablet';
const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const Sales = ({ className,countToyStatus, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const getData= (count) => {
    const data = {
      datasets: [
        {
          data: [count.ready, count.pending, count.sold],
          backgroundColor: [
            colors.orange[600],
            colors.blue[500],
            colors.deepPurple[200]
            
          ],
          borderWidth: 8,
          borderColor: colors.common.white,
          hoverBorderColor: colors.common.white
        }
      ],
      labels: ['Sẵn sàng', 'Đang giao dịch','Đã bán']
    }
    return data;
  }

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
        title: 'Sẵn sàng',
        value: count.ready,
        icon: LaptopMacIcon,
        color: colors.orange[600]
      },
      {
        title: 'Đang giao dịch',
        value: count.pending,
        icon: TabletIcon,
        color: colors.blue[600]
      },
      {
        title: 'Đã bán',
        value: count.sold,
        icon: PhoneIcon,
        color: colors.deepPurple[200]
      }
    ];
    return devices;
  }
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Đồ chơi" />
      <Divider />
      <CardContent>
        <Box
          height={300}
          position="relative"
        >
          <Doughnut
            data={getData(countToyStatus)}
            options={options}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          mt={2}
        >
          {getDevices(countToyStatus).map(({
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

Sales.propTypes = {
  className: PropTypes.string
};

export default Sales;
