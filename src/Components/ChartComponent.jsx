import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, TimeScale, Title } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, TimeScale, Title);

const ChartComponent = ({ chartData }) => {
  const data = {
    labels: chartData.map(item => new Date(item.time).toLocaleTimeString()),
    datasets: [
      {
        label: 'Candlestick Data',
        data: chartData.map(item => item.close),
        fill: false,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Live Cryptocurrency Data',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ChartComponent;
