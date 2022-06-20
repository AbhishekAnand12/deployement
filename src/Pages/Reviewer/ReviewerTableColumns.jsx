import React from 'react';
import PropTypes from 'prop-types';
import ReviewerDashboard from './ReviewerDashboard';

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
    label: 'Trainer',
    field: 'trainer',
  },
  {
    label: 'Action',
    field: 'action',
  },

];

const TrainerTableColumns = (props) => {
  const { traineeData, traineeId } = props;
  return (
    <ReviewerDashboard traineeData={traineeData} traineeId={traineeId} sx={{ height: '20%' }} tablecols={tablecols} />
  );
};

TrainerTableColumns.propTypes = {
  traineeData: PropTypes.arrayOf(PropTypes.string).isRequired,
  traineeId: PropTypes.string.isRequired,
};

export default TrainerTableColumns;
