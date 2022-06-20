import React from 'react';
import { Typography, Box } from '@mui/material';
import { useQuery } from '@apollo/client';
import Caurosel from './Carousel';
import Graph from '../../Components/Graph/Graph';
import { GET_TRAINEE, GET_FEEDBACK, GET_TRAINEESDETAILS } from '../../ApolloClient/query';

const Trainee = () => {
  const { data: userData, loading, error } = useQuery(GET_TRAINEE);
  const { data: feedbackData } = useQuery(GET_FEEDBACK);
  const { data: traineeBatchData } = useQuery(GET_TRAINEESDETAILS);

  if (loading) return 'Loading...';
  if (error) return 'Error!';

  const traineeData = userData?.userProfileData?.data || [];
  const traineeCoordinator = traineeBatchData?.getAddFeedbackData?.coordinators[0].name;
  const reviewers = traineeBatchData?.getAddFeedbackData?.reviewers || [];

  const traineeReviewer = reviewers.filter(
    (option) => option?.assignedTrainees?.originalId
    === userData?.userProfileData?.data?.originalId,
  );

  const graphData1 = feedbackData?.getFeedbackData?.data?.filter((option) => option.givenFor
  === userData?.userProfileData?.data?.originalId);

  const graphData = graphData1?.map((option) => {
    const feedbackElement = {
      week: option?.week,
    };
    option?.rating?.forEach((element) => {
      feedbackElement[element?.question] = element?.answer;
    });
    return feedbackElement;
  });

  const cauroselData = feedbackData?.getFeedbackData?.data?.filter(
    (element) => element.givenFor === userData?.userProfileData?.data?.originalId,
  );

  return (
    <>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 2, ml: 10, width: '34ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <Typography
          variant="p"
          component="p"
          style={{ display: 'inline-block', color: 'grey' }}
        >
          <b>Email</b>
          {' '}
          :
          {' '}
          {traineeData.email}
        </Typography>
        <Typography
          variant="p"
          component="p"
          style={{ display: 'inline-block', color: 'grey' }}
        >
          <b>TrainingCoordinator</b>
          {' '}
          :
          {' '}
          {traineeCoordinator}
        </Typography>
        <Typography
          variant="p"
          component="p"
          style={{ display: 'inline-block', color: 'grey' }}
        >
          <b>Reviewer</b>
          {' '}
          :
          {' '}
          {traineeReviewer[0]?.reviewer?.name}
        </Typography>
        <Typography
          variant="p"
          component="p"
          style={{ display: 'inline-block', color: 'grey' }}
        >
          <b>Department</b>
          {' '}
          :
          {' '}
          {traineeData.department}
        </Typography>
        <Typography
          variant="p"
          component="p"
          style={{ display: 'inline-block', color: 'grey' }}
        >
          <b>Location</b>
          {' '}
          :
          {' '}
          {traineeData.location}
        </Typography>
        <Typography
          variant="p"
          component="p"
          style={{ display: 'inline-block', color: 'grey' }}
        >
          <b>Contact No.</b>
          {' '}
          :
          {' '}
          {traineeData.contactNo}
        </Typography>
      </Box>
      <Graph Data={graphData || []} />
      <Caurosel cauroselData={cauroselData} />
    </>
  );
};

export default Trainee;
