import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PressureChart = ({ data }) => {
  const systolicData = data.map(item => item.systolic);
  const diastolicData = data.map(item => item.diastolic);

  const chartData = {
    labels: data.map(item => item.date.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // Use 24-hour format
    })),
    datasets: [
      {
        label: 'Sistólica Máxima',
        data: data.length > 0 ? Array(data.length).fill(Math.max(...systolicData)) : [],
        borderColor: 'transparent',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: 1,
        pointRadius: 0,
      },
      {
        label: 'Sistólica',
        data: systolicData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        fill: false,
      },
      {
        label: 'Sistólica Mínima',
        data: data.length > 0 ? Array(data.length).fill(Math.min(...systolicData)): [],
        borderColor: 'transparent',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: '-1',
        pointRadius: 0,
      },
      {
        label: 'Diastólica Máxima',
        data: data.length > 0 ? Array(data.length).fill(Math.max(...diastolicData)) : [],
        borderColor: 'transparent',
        backgroundColor: 'rgba(53, 162, 235, 0.2)',
        fill: 4,
        pointRadius: 0,
      },
      {
        label: 'Diastólica',
        data: diastolicData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        fill: false,
      },
      {
        label: 'Diastólica Mínima',
        data: data.length > 0 ? Array(data.length).fill(Math.min(...diastolicData)) : [],
        borderColor: 'transparent',
        backgroundColor: 'rgba(53, 162, 235, 0.2)',
        fill: '-1',
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: false,
        text: 'Gráfico de Presión Arterial',
      },
      legend: {
        labels: {
          font: {
            size: 12,
          },
          color: 'rgb(55 65 81)', // Default text color
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
          },
          color: 'rgb(55 65 81)'
        },
        grid: {
          color: 'rgb(209 213 219)'
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        ticks: {
          font: {
            size: 12,
          },
          color: 'rgb(55 65 81)'
        },
        grid: {
          color: 'rgb(209 213 219)'
        }
      },
    },
  };

  return (
    <Line
      options={options}
      data={chartData}
    />
  );
};

export default PressureChart;
