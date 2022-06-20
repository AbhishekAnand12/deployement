import Button from '@mui/material/Button';
import React from 'react';
import PropTypes from 'prop-types';
import TrainingCoordinatorDashboard from './TrainingCoorinatorDashboard';

const actions = [
  {
    icon: <Button variant="contained">View</Button>
    ,
  },
];

const tablecols = [
  {
    label: 'Traineename',
    field: 'traineename',
  },
  {
    label: 'Department',
    field: 'department',
  },
  {
    label: 'Reviewer',
    field: 'reviewers',
  },
  {
    label: 'Trainer',
    field: 'assignedTrainees',
  },
  {
    label: 'Action',
    field: 'action',
  },

];

const CoordinatorTableColumns = (props) => {
  const { coordinatorData } = props;
  return (
    <TrainingCoordinatorDashboard coordinatorData={coordinatorData} sx={{ height: '20%' }} tablecols={tablecols} actions={actions} />
  );
};

CoordinatorTableColumns.propTypes = {
  coordinatorData: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CoordinatorTableColumns;
