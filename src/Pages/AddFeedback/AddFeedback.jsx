import React, { useState } from 'react';
import moment from 'moment-timezone';
import {
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  Typography,
  Button,
  MenuItem,
} from '@mui/material';
import { useQuery, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import {
  GET_REVIEWER_TRAINEES,
  ADD_FEEDBACK,
  USERPROFILEDATA,
} from '../../ApolloClient';
import {
  initialState, validationSchema, Item,
  hasErrors, hasTouched,
} from './helper';

const AddFeedBack = (props) => {
  const { data } = props;
  const [marks, setMarks] = useState(initialState);

  const {
    batchId,
    givenFor,
    givenBy,
    week,
    rating: [{ question, answer }],
    codeQuality,
    communication,
    behaviour,
    taskDelivery,
    comprehension,
    emailCommunication,
    redmine,
    goodPoints,
    improvementRequired,
    isTouched,
    error,
  } = marks;

  const handleError = (values) => {
    validationSchema
      .validate(
        {
          batchId,
          givenFor,
          givenBy,
          week,
          rating: [{ question, answer }],
          codeQuality,
          communication,
          behaviour,
          taskDelivery,
          comprehension,
          emailCommunication,
          redmine,
          goodPoints,
          improvementRequired,
        },
        { abortEarly: false },
      )
      .then(() => {
        setMarks({
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
          setMarks({
            ...values,
            error: schemaErrors,
          });
        }
      });
  };

  const handleOnNameChange = (event) => {
    setMarks({
      ...marks,
      givenFor: event.target.value,
    });
    handleError({
      ...marks,
      givenFor: event.target.value,
    });
  };
  const handleOnWeekChange = (event) => {
    setMarks({
      ...marks,
      week: event.target.value,
    });
    handleError({
      ...marks,
      week: event.target.value,
    });
  };

  const handleOnCodeQualityChange = (event) => {
    setMarks({
      ...marks,
      codeQuality: event.target.value,
    });
    handleError({
      ...marks,
      codeQuality: event.target.value,
    });
  };

  const handleOnCommunicationChange = (event) => {
    setMarks({
      ...marks,
      communication: event.target.value,
    });
    handleError({
      ...marks,
      communication: event.target.value,
    });
  };

  const handleOnBehaviourChange = (event) => {
    setMarks({
      ...marks,
      behaviour: event.target.value,
    });
    handleError({
      ...marks,
      behaviour: event.target.value,
    });
  };

  const handleOnTaskDeliveryChange = (event) => {
    setMarks({
      ...marks,
      taskDelivery: event.target.value,
    });
    handleError({
      ...marks,
      taskDelivery: event.target.value,
    });
  };

  const handleOnComprehensionChange = (event) => {
    setMarks({
      ...marks,
      comprehension: event.target.value,
    });
    handleError({
      ...marks,
      comprehension: event.target.value,
    });
  };

  const handleOnEmailCommunicationChange = (event) => {
    setMarks({
      ...marks,
      emailCommunication: event.target.value,
    });
    handleError({
      ...marks,
      emailCommunication: event.target.value,
    });
  };

  const handleOnRedmineChange = (event) => {
    setMarks({
      ...marks,
      redmine: event.target.value,
    });
    handleError({
      ...marks,
      redmine: event.target.value,
    });
  };

  const handleOnGoodPointsChange = (event) => {
    setMarks({
      ...marks,
      goodPoints: event.target.value,
    });
    handleError({
      ...marks,
      goodPoints: event.target.value,
    });
  };

  const handleOnImprovementPointsChange = (event) => {
    setMarks({
      ...marks,
      improvementRequired: event.target.value,
    });
    handleError({
      ...marks,
      improvementRequired: event.target.value,
    });
  };

  const handleOnBlur = (event, type) => {
    isTouched[type] = true;
    const newValue = {
      ...marks,
      isTouched,
    };
    setMarks(newValue);
    handleError(newValue);
  };

  const getError = (type) => {
    if (isTouched[type]) {
      return error[type] || '';
    }
    return '';
  };

  const { data: userProfileData } = useQuery(USERPROFILEDATA);
  const reviewerId = userProfileData?.userProfileData.data?.originalId || '';

  const { data: combinedData } = useQuery(GET_REVIEWER_TRAINEES, {
    variables: { originalId: reviewerId, role: data },
  });

  const reviewer = combinedData?.getAddFeedbackData?.reviewers || [];
  const BatchId = combinedData?.getAddFeedbackData?.originalId || '';

  const trainees = reviewer.map((option) => option.assignedTrainees);

  const reviewerTrainees = reviewer.filter(
    (option) => option?.reviewer?.originalId
      === userProfileData?.userProfileData.data?.originalId,
  );

  const startDate1 = combinedData?.getAddFeedbackData?.startDate;
  const endDate1 = combinedData?.getAddFeedbackData?.endDate;

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
  const [addedFeedbackData, { loadings, Errors }] = useMutation(ADD_FEEDBACK);

  if (loadings) return 'Fetching....';
  if (Errors) return 'error....';

  const handleOnSubmit = () => {
    addedFeedbackData({
      variables: {
        input: {
          batchId: BatchId || combinedData?.getAddFeedbackData?.originalId,
          week,
          givenFor: marks?.givenFor,
          givenBy: reviewerId,
          rating: [
            {
              question: 'codeQuality',
              answer: codeQuality,
            },
            {
              question: 'communication',
              answer: communication,
            },
            {
              question: 'behaviour',
              answer: behaviour,
            },
            {
              question: 'taskDelivery',
              answer: taskDelivery,
            },
            {
              question: 'comprehension',
              answer: comprehension,
            },
            {
              question: 'emailCommunication',
              answer: emailCommunication,
            },
            {
              question: 'redmine',
              answer: redmine,
            },
          ],
          goodPoints,
          improvementRequired,
        },
      },
    });
  };

  return (
    <>
      <br />
      <br />
      &nbsp;&nbsp; Trainee Name: &nbsp;&nbsp;
      <Select
        sx={{ width: '20ch', m: 0, mr: 70 }}
        onChange={handleOnNameChange}
        error={getError('givenFor')}
        onBlur={(event) => {
          handleOnBlur(event, 'givenFor');
        }}
        helperText={getError('givenFor')}
        native
        id="grouped-native-select"
      >
        <option>Please Select</option>
        {(data === 'reviewer') ? reviewerTrainees.map((option) => (
          <option value={option?.assignedTrainees?.originalId}>
            {option?.assignedTrainees?.name}
          </option>
        )) : trainees.map((option) => (
          <option value={option.originalId}>
            {option?.name}
          </option>
        ))}
      </Select>
      Week No: &nbsp;&nbsp;
      <Select
        sx={{ width: '20ch' }}
        onChange={handleOnWeekChange}
        error={getError('week')}
        onBlur={(event) => {
          handleOnBlur(event, 'week');
        }}
        helperText={getError('week')}
        displayEmpty
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
      <br />
      <br />
      <Table style={{ width: 100 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell
              style={{ border: 'none', boxShadow: 'none', textAlign: 'center' }}
            >
              Category
            </TableCell>
            <TableCell
              style={{ border: 'none', boxShadow: 'none', textAlign: 'center' }}
            >
              Marks
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow style={{ border: 'none', boxShadow: 'none' }}>
            <TableCell
              style={{ border: 'none', boxShadow: 'none' }}
              component="th"
              scope="row"
            >
              Code Quality
            </TableCell>
            <TableCell
              style={{ border: 'none', boxShadow: 'none' }}
              component="th"
            >
              <Select
                sx={{ m: 0, width: '5rem' }}
                onChange={handleOnCodeQualityChange}
                error={getError('codeQuality')}
                onBlur={(event) => {
                  handleOnBlur(event, 'codeQuality');
                }}
                helperText={getError('codeQuality')}
                native
                id="grouped-native-select"
              >
                {[0, 1, 2, 3, 4, 5].map((option) => (
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
              Communication
            </TableCell>
            <TableCell
              style={{ border: 'none', boxShadow: 'none' }}
              component="th"
            >
              <Select
                sx={{ m: 0, width: '5rem' }}
                onChange={handleOnCommunicationChange}
                error={getError('communication')}
                onBlur={(event) => {
                  handleOnBlur(event, 'communication');
                }}
                helperText={getError('communication')}
                native
                id="grouped-native-select"
              >
                {[0, 1, 2, 3, 4, 5].map((option) => (
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
              Behaviour
            </TableCell>
            <TableCell
              style={{ border: 'none', boxShadow: 'none' }}
              component="th"
            >
              <Select
                sx={{ m: 0, width: '5rem' }}
                onChange={handleOnBehaviourChange}
                error={getError('behaviour')}
                onBlur={(event) => {
                  handleOnBlur(event, 'behaviour');
                }}
                helperText={getError('behaviour')}
                native
                id="grouped-native-select"
              >
                {[0, 1, 2, 3, 4, 5].map((option) => (
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
              Task Delivery
            </TableCell>
            <TableCell
              style={{ border: 'none', boxShadow: 'none' }}
              component="th"
            >
              <Select
                sx={{ m: 0, width: '5rem' }}
                onChange={handleOnTaskDeliveryChange}
                error={getError('taskDelivery')}
                onBlur={(event) => {
                  handleOnBlur(event, 'taskDelivery');
                }}
                helperText={getError('taskDelivery')}
                native
                id="grouped-native-select"
              >
                {[0, 1, 2, 3, 4, 5].map((option) => (
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
              Comprehension
            </TableCell>
            <TableCell
              style={{ border: 'none', boxShadow: 'none' }}
              component="th"
            >
              <Select
                sx={{ m: 0, width: '5rem' }}
                onChange={handleOnComprehensionChange}
                error={getError('comprehension')}
                onBlur={(event) => {
                  handleOnBlur(event, 'comprehension');
                }}
                helperText={getError('comprehension')}
                native
                id="grouped-native-select"
              >
                {[0, 1, 2, 3, 4, 5].map((option) => (
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
              Email Communication
            </TableCell>
            <TableCell
              style={{ border: 'none', boxShadow: 'none' }}
              component="th"
            >
              <Select
                sx={{ m: 0, width: '5rem' }}
                onChange={handleOnEmailCommunicationChange}
                error={getError('emailCommunication')}
                onBlur={(event) => {
                  handleOnBlur(event, 'emailCommunication');
                }}
                helperText={getError('emailCommunication')}
                native
                id="grouped-native-select"
              >
                {[0, 1, 2, 3, 4, 5].map((option) => (
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
              Redmine
            </TableCell>
            <TableCell
              style={{ border: 'none', boxShadow: 'none' }}
              component="th"
            >
              <Select
                sx={{ m: 0, width: '5rem' }}
                onChange={handleOnRedmineChange}
                error={getError('remine')}
                onBlur={(event) => {
                  handleOnBlur(event, 'remine');
                }}
                helperText={getError('remine')}
                native
                id="grouped-native-select"
              >
                {[0, 1, 2, 3, 4, 5].map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </Select>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <br />
      <br />
      <Typography variant="h6" component="h6">
        Add Description
      </Typography>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <Item>
            Good Points
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
              onChange={handleOnGoodPointsChange}
              error={getError('goodPoints')}
              onBlur={(event) => {
                handleOnBlur(event, 'goodPoints');
              }}
              helperText={getError('goodPoints')}
            />
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item>
            Improvement Required
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
              onChange={handleOnImprovementPointsChange}
              error={getError('improvementRequired')}
              onBlur={(event) => {
                handleOnBlur(event, 'improvementRequired');
              }}
              helperText={getError('improvementRequired')}
            />
          </Item>
        </Grid>
      </Grid>
      <br />
      <br />
      <br />
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

AddFeedBack.propTypes = {
  data: PropTypes.string,
};

AddFeedBack.defaultProps = {
  data: '',
};

export default AddFeedBack;
