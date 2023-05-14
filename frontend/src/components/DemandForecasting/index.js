import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import './style.css';

const DemandForecasting = ({ demand }) => {
  const [forecastedData, setForecastedData] = useState([]);
  const [date, setDate] = useState([
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ]);

  const series = [
    {
      name: 'Forecasted',
      data: forecastedData,
    },
  ];
  const options = {
    grid: {
      row: {
        colors: ['#a1ffc3'],
      },
      column: {
        colors: ['#a1ffc3'],
      },
    },

    title: {
      text: `Regional Tourism Demand Forecast`,
    },

    markers: {
      colors: ['#0f99a3'],
    },

    chart: {
      height: 350,
      type: 'area',
    },

    colors: ['#000000', '#ff0000'],

    dataLabels: {
      enabled: true,
      offsetX: -6,
      offsetY: -6,
      style: {
        fontSize: '12px',
        colors: ['#6480de', '#b83b50'],
      },
    },

    dropShadow: {
      enabled: true,
      top: 0,
      left: 0,
      blur: 3,
      opacity: 0.9,
    },

    stroke: {
      curve: 'smooth',
      show: true,
      colors: ['#ff0000'],
    },

    tooltip: {
      shared: true,
      intersect: false,
    },

    xaxis: {
      categories: date,
    },
  };

  useEffect(() => {
    setForecastedData(demand.data.data);
  }, []);

  return (
    <div className="container">
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={500}
      />
    </div>
  );
};

export default DemandForecasting;
