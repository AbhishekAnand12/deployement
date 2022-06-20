export default {
  plugins: {
    title: {
      display: true,
      text: 'Trainee Performance',
      font: {
        size: 10,
      },
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
      title: {
        display: true,
        text: 'Weeks',
        innerWidth: '100%',
        ticks: {
          precision: 0,
        },
        font: {
          size: 10,
        },
      },
    },
    y: {
      stacked: true,
      title: {
        display: true,
        text: 'Weeks',
        innerWidth: '100%',
        ticks: {
          precision: 0,
        },
        font: {
          size: 10,
        },
      },
    },
  },
};
