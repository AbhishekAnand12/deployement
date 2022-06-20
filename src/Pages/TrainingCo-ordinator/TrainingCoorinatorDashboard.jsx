import React, { useState } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { Query } from '@apollo/client/react/components';
import { useQuery } from '@apollo/client';
import TrainerTable from './TrainingCoordinatorTable';
import FeedBackStatus from '../../Components/FeedbackStatus/FeedbackStatus';
import Selectbatch from '../../Components/Batch/Selectbatch';
import { GETBATCHBYID, GETFEEDBACKBYTRAINEEID, TRAINEEBYID } from '../../ApolloClient/query';
import Graph from '../../Components/Graph/Graph';

const TrainingCoordinatorDashboard = (props) => {
  const { tablecols, actions } = props;
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [feedbackId, setFeedbackId] = useState(null);

  const handleonBatchChange = (e) => {
    setSelectedBatch(e.target.value);
  };
  const handleOnFeedbackChange = (e) => {
    setFeedbackId(e);
  };
  const { data: traineeOriginalId } = useQuery(
    TRAINEEBYID,
    {
      variables: { originalId: feedbackId },
    },
  );
  const traineeId = traineeOriginalId?.getUserById?.data;

  return (
    <Box>
      <Selectbatch handleonBatchChange={handleonBatchChange} />
      <br />
      <FeedBackStatus />
      <br />
      <br />
      <Query
        query={GETFEEDBACKBYTRAINEEID}
        variables={{ givenFor: traineeId }}
      >
        {
          ({ data: feedbackData, loading }) => {
            const data = feedbackData?.getFeedbackByTraineeId.map((element) => {
              const feedbackWeek = {
                week: element.week,
              };
              element.rating.forEach((ele) => {
                feedbackWeek[ele.question] = ele.answer;
              });
              return feedbackWeek || null;
            });
            if (loading) {
              return 'loaing...';
            }
            if (data) {
              return (
                <Graph
                  handleOnFeedbackChange={handleOnFeedbackChange}
                  data={data}
                />
              );
            }
            return null;
          }
        }
      </Query>
      {selectedBatch && (
        <Query
          query={GETBATCHBYID}
          variables={{ getBatchByIdId: selectedBatch }}
        >
          {
            ({ data: traineeData, loading }) => {
              const data = traineeData?.getBatchById?.reviewers.map((e) => ({
                reviewer: e.reviewer.name,
                trainers: traineeData?.getBatchById?.coordinators.map((el) => el.name),
                assignedTrainees: e.assignedTrainees.name,
                department: e.assignedTrainees.department,
              }));
              if (loading) {
                return 'loaing...';
              }
              if (data) {
                return (
                  <TrainerTable
                    traineeData={data}
                    columns={tablecols}
                    actions={actions}
                    traineeId={traineeId}
                    handleOnFeedbackChange={handleOnFeedbackChange}
                  />
                );
              }
              return null;
            }
          }
        </Query>
      )}

    </Box>
  );
};

TrainingCoordinatorDashboard.propTypes = {
  tablecols: PropTypes.arrayOf(PropTypes.string),
  actions: PropTypes.arrayOf(PropTypes.string),
};

TrainingCoordinatorDashboard.defaultProps = {
  tablecols: [],
  actions: [],
};

export default TrainingCoordinatorDashboard;
