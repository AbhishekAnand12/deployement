import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableCell, TableHead, TableRow, Select, TextField, Button, Grid, MenuItem,
} from '@mui/material';
import { useQuery, useMutation } from '@apollo/client';
import moment from 'moment-timezone';
import {
  Item, validationSchema, initialState, hasErrors, hasTouched,
} from './helper';
import { GET_COMBINEDDATA, GET_TRAINER } from '../../ApolloClient/query';
import { ADD_TRAINER_FEEDBACK } from '../../ApolloClient/mutation';

const AddFeedback = (props) => {
  const { role } = props;
  const { data: userProfileData } = useQuery(GET_COMBINEDDATA);
  const traineeId = userProfileData?.userProfileData.data?.originalId || '';
  const { data: feedbackCombinedData } = useQuery(GET_TRAINER, {
    variables: { originalId: traineeId, role },
  });
  const [addedFeedbackData, { loadings, Errors }] = useMutation(ADD_TRAINER_FEEDBACK);

  const [mark, setMark] = useState(initialState);

  const {
    batchId,
    givenFor,
    givenBy,
    week,
    rating: [{ question, answer }],
    ratingReviewer,
    rateTask,
    ratingTrainer,
    trainingProcess,
    description,
    isTouched,
    error,
  } = mark;

  const handleError = (values) => {
    validationSchema
      .validate(
        {
          batchId,
          givenFor,
          week,
          rating: [
            {
              question,
              answer,
            },
          ],
          givenBy,
          rateTask,
          ratingReviewer,
          ratingTrainer,
          description,
          trainingProcess,
        },
        { abortEarly: false },
      )
      .then(() => {
        setMark({
          ...values,
          error: {},
        });
      })
      .catch((allErrors) => {
        const schemaErrors = {};
        if (allErrors) {
          allErrors.inner.forEach((err) => {
            schemaErrors[err.path] = err.message;
          });
          setMark({
            ...values,
            error: schemaErrors,
          });
        }
      });
  };

  const handleOnTraineeNameChange = (event) => {
    setMark({
      ...mark,
      givenFor: event.target.value,
    });
    handleError({
      ...mark,
      givenFor: event.target.value,
    });
  };

  const handleOnWeekChange = (event) => {
    setMark({
      ...mark,
      week: event.target.value,
    });
    handleError({
      ...mark,
      week: event.target.value,
    });
  };

  const handleOnTrainingRatingChange = (event) => {
    setMark({
      ...mark,
      trainingProcess: event.target.value,
    });
    handleError({
      ...mark,
      trainingProcess: event.target.value,
    });
  };

  const handleOnTrainerRatingChange = (event) => {
    setMark({
      ...mark,
      ratingTrainer: event.target.value,
    });
    handleError({
      ...mark,
      ratingTrainer: event.target.value,
    });
  };

  const handleOnReviewerRatingChange = (event) => {
    setMark({
      ...mark,
      ratingReviewer: event.target.value,
    });
    handleError({
      ...mark,
      ratingReviewer: event.target.value,
    });
  };

  const handleOnRateTaskChange = (event) => {
    setMark({
      ...mark,
      rateTask: event.target.value,
    });
    handleError({
      ...mark,
      rateTask: event.target.value,
    });
  };

  const handleAddDescriptionChange = (event) => {
    setMark({
      ...mark,
      description: event.target.value,
    });
    handleError({
      ...mark,
      description: event.target.value,
    });
  };

  const handleOnBlur = (event, type) => {
    isTouched[type] = true;
    const newValue = {
      ...mark,
      isTouched,
    };
    setMark(newValue);
    handleError(newValue);
  };

  const getError = (type) => {
    if (isTouched[type]) {
      return error[type] || '';
    }
    return '';
  };

  const Trainers = feedbackCombinedData?.getAddFeedbackData?.trainers || [];
  const BatchId = feedbackCombinedData?.getAddFeedbackData?.originalId || '';
  const startDate1 = feedbackCombinedData?.getAddFeedbackData?.startDate;
  const endDate1 = feedbackCombinedData?.getAddFeedbackData?.endDate;

  const getDaysBetweenDates = (startDate, endDate) => {
    const now = startDate;
    const dates = [];

    while (now.isSameOrBefore(endDate)) {
      const d = {};
      d.start = now.format('MMMM Do, YYYY');
      const diff = endDate.diff(now, 'days');
      now.add(diff >= 7 ? 7 : diff, 'days');
      d.end = now.format('MMMM Do, YYYY');
      dates.push(d);
      now.add(1, 'days');
    }
    return dates;
  };

  const startDate = moment(startDate1);
  const endDate = moment(endDate1);
  const dateList = getDaysBetweenDates(startDate, endDate) || [];
  const dataMap = dateList.map((option) => {
    const temp = `${option.start}-${option.end}`;
    return temp;
  });

  if (loadings) return 'Fetching....';
  if (Errors) return 'error....';

  const handleOnSubmit = () => {
    addedFeedbackData({
      variables: {
        input: {
          batchId: BatchId || '',
          week,
          givenFor,
          givenBy: traineeId,
          rating: [
            {
              question: 'Training Process',
              answer: trainingProcess,
            },
            {
              question: 'Trainer Rating',
              answer: ratingTrainer,
            },
            {
              question: 'Reviewer Rating',
              answer: ratingReviewer,
            },
            {
              question: 'Trainer Rating',
              answer: rateTask,
            },
          ],
          description,
        },
      },
    });
  };

  return (
    <>
      <div style={{ marginLeft: 50 }}>
        <b>Trainer Name:</b>
        <Select
          sx={{ m: 5, mr: 20, width: '20ch' }}
          align="center"
          onChange={handleOnTraineeNameChange}
          error={getError('givenFor')}
          onBlur={(event) => {
            handleOnBlur(event, 'givenFor');
          }}
          helperText={getError('givenFor')}
          id="grouped-native-select"
        >
          {Trainers.map((option) => (
            <MenuItem value={option.originalId}>{option.name}</MenuItem>
          ))}
        </Select>
        <b>Week:</b>
        <Select
          sx={{ ml: 5, width: '20ch' }}
          onChange={handleOnWeekChange}
          error={getError('week')}
          onBlur={(event) => {
            handleOnBlur(event, 'week');
          }}
          helperText={getError('week')}
          id="grouped-native-select"
        >
          {dataMap.map((option, index) => {
            const newValue = `Week-${index + 1} ${option}`;
            return (
              <MenuItem value={newValue}>
                Week-
                {index + 1}
                {' '}
                (
                {option}
                )
              </MenuItem>
            );
          })}
        </Select>
      </div>
      <Table
        sx={{ ml: 5, width: '70%' }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 300, border: 0, fontWeight: 'bold' }}>
              Category
            </TableCell>
            <TableCell sx={{ border: 0, fontWeight: 'bold' }}>Marks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow style={{ border: 'none', boxShadow: 'none' }}>
            <TableCell
              style={{ border: 'none', boxShadow: 'none' }}
              component="th"
              scope="row"
            >
              Overall Rating of the Training Process?
            </TableCell>
            <TableCell style={{ border: 'none', boxShadow: 'none' }}>
              <Select
                sx={{ m: 0, width: '5rem' }}
                onChange={handleOnTrainingRatingChange}
                error={getError('trainingProcess')}
                onBlur={(event) => {
                  handleOnBlur(event, 'trainingProcess');
                }}
                helperText={getError('trainingProcess')}
                native
                id="grouped-native-select"
              >
                {[1, 2, 3, 4, 5].map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </Select>
            </TableCell>
          </TableRow>
          <TableRow style={{ border: 'none', boxShadow: 'none' }}>
            <TableCell
              style={{ border: 'none', boxShadow: 'none' }}
              component="th"
              scope="row"
            >
              Overall Rating of the Trainer?
            </TableCell>
            <TableCell
              style={{ border: 'none', boxShadow: 'none' }}
              component="th"
            >
              <Select
                sx={{ m: 0, width: '5rem' }}
                onChange={handleOnTrainerRatingChange}
                error={getError('ratingTrainer')}
                onBlur={(event) => {
                  handleOnBlur(event, 'ratingTrainer');
                }}
                helperText={getError('ratingTrainer')}
                native
                id="grouped-native-select"
              >
                {[1, 2, 3, 4, 5].map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </Select>
            </TableCell>
          </TableRow>
          <TableRow style={{ border: 'none', boxShadow: 'none' }}>
            <TableCell
              style={{ border: 'none', boxShadow: 'none' }}
              component="th"
              scope="row"
            >
              Overall Rating of the Reviewer?
            </TableCell>
            <TableCell
              style={{ border: 'none', boxShadow: 'none' }}
              component="th"
            >
              <Select
                sx={{ m: 0, width: '5rem' }}
                onChange={handleOnReviewerRatingChange}
                error={getError('ratingReviewer')}
                onBlur={(event) => {
                  handleOnBlur(event, 'ratingReviewer');
                }}
                helperText={getError('ratingReviewer')}
                native
                id="grouped-native-select"
              >
                {[1, 2, 3, 4, 5].map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </Select>
            </TableCell>
          </TableRow>
          <TableRow style={{ border: 'none', boxShadow: 'none' }}>
            <TableCell
              style={{ border: 'none', boxShadow: 'none' }}
              component="th"
              scope="row"
            >
              How would you rate the tasks for this week?
            </TableCell>
            <TableCell
              style={{ border: 'none', boxShadow: 'none' }}
              component="th"
            >
              <Select
                sx={{ m: 0, width: '5rem' }}
                onChange={handleOnRateTaskChange}
                error={getError('rateTask')}
                onBlur={(event) => {
                  handleOnBlur(event, 'rateTask');
                }}
                helperText={getError('rateTask')}
                native
                id="grouped-native-select"
              >
                {[1, 2, 3, 4, 5].map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </Select>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Grid
        sx={{ ml: 5, mb: 5, width: '70%' }}
        container
        spacing={2}
        columns={16}
      >
        <Grid item xs={8}>
          <b>Add Description</b>
          <Item>
            <TextField
              fullWidth
              multiline
              id="outlined-basic"
              variant="outlined"
              autoComplete="off"
              inputProps={{
                style: {
                  height: '6rem',
                },
              }}
              onChange={handleAddDescriptionChange}
              error={getError('description')}
              onBlur={(event) => {
                handleOnBlur(event, 'description');
              }}
              helperText={getError('description')}
            />
          </Item>
        </Grid>
      </Grid>
      <Button
        sx={{ marginRight: '20px' }}
        style={{ float: 'right' }}
        variant="contained"
        onClick={() => handleOnSubmit()}
        disabled={hasErrors(error) || !hasTouched(isTouched)}
      >
        Submit
      </Button>
      <Button
        sx={{ marginRight: '10px' }}
        style={{ float: 'right' }}
        variant="outlined"
      >
        Cancel
      </Button>
      <br />
      <br />
      <br />
    </>
  );
};

AddFeedback.propTypes = {
  role: PropTypes.string,
};

AddFeedback.defaultProps = {
  role: '',
};

export default AddFeedback;
