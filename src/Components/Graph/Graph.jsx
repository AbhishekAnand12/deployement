import React from 'react';
import PropTypes from 'prop-types';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import options from './constant';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const Graph = (props) => {
  const { data } = props;
  const Data = {
    labels: data.map((id) => id.week),
    datasets: [
      {
        label: 'Email Communication',
        data: data.map((id) => id.emailCommunication),
        backgroundColor: 'rgb(104, 102, 0)',
      },
      {
        label: 'Redmine',
        data: data.map((id) => id.redmine),
        backgroundColor: 'rgb(204, 0, 0)',
      },
      {
        label: 'Code Quality',
        data: data.map((id) => id.codeQuality),
        backgroundColor: 'rgb(128, 0, 255)',
      },
      {
        label: 'Communication',
        data: data.map((id) => id.communication),
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'Behaviour',
        data: data.map((id) => id.behaviour),
        backgroundColor: 'rgb(21, 153, 193)',
      },
      {
        label: 'Task Delivery',
        data: data.map((id) => id.taskDelivery),
        backgroundColor: 'rgb(196, 192, 192)',
      },
      {
        label: 'Comprehension',
        data: data.map((id) => id.comprehension),
        backgroundColor: 'rgb(255, 255, 0)',
      },
    ],
  };

  return <Bar options={options} data={Data} width="500px" margin="auto" />;
};

Graph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
};

Graph.defaultProps = {
  data: [],
};

export default Graph;
