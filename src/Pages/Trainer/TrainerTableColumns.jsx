import React from 'react';
import PropTypes from 'prop-types';
import TrainerDashboard from './TrainerDashboard';

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
    label: 'TrainingCoordinator',
    field: 'trainingcoordinator',
  },
  {
    label: 'Reviewer',
    field: 'reviewer',
  },
  {
    label: 'Action',
    field: 'action',
  },

];

const TrainerTableColumns = (props) => {
  const { traineeData, traineeId } = props;
  return (
    <TrainerDashboard traineeData={traineeData} traineeId={traineeId} sx={{ height: '20%' }} tablecols={tablecols} />
  );
};

TrainerTableColumns.propTypes = {
  traineeData: PropTypes.arrayOf(PropTypes.string).isRequired,
  traineeId: PropTypes.string.isRequired,
};

export default TrainerTableColumns;
