import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import {
  Grid,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  DialogActions,
  Button,
  InputAdornment,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useMutation } from '@apollo/client';
import GroupIcon from '@mui/icons-material/Group';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PersonIcon from '@mui/icons-material/Person';
import { UPDATE_BATCH } from '../../ApolloClient/mutation';

const EditBatch = (props) => {
  const {
    batchEditDialog, onClose, onSubmit, data = {},
  } = props;

  const [updatedBatch, { loading }] = useMutation(UPDATE_BATCH);

  const initialState = {
    batchName: data && data?.batchName,
    startDate: data && data?.startDate,
    endDate: data && data?.endDate,
    trainers: data && data?.trainers,
    coordinators: data && data?.coordinators,
    reviewers: data && data?.reviewers,
    trainees: data && data?.trainees,
    isTouched: {},
    error: {},
  };

  const [authenticated, setAuthenticated] = useState(false);
  const [editBatchFormValues, setEditBatchFormValues] = useState(initialState);

  const {
    batchName,
    startDate,
    endDate,
    trainers,
    coordinators,
    reviewers,
    trainees,
    isTouched,
    error,
  } = editBatchFormValues;

  const batchValidationSchema = yup.object({
    batchName: yup.string().label('Batch Name').required(),
    startDate: yup.string().label('Start Date').required(),
    endDate: yup.string().label('End Date').required(),
    trainers: yup.string().label('Trainer').required(),
    coordinators: yup.string().label('Co-ordinator').required(),
    reviewers: yup.string().label('Reviewer').required(),
  });

  const handleError = (values) => {
    batchValidationSchema
      .validate(
        {
          batchName,
          startDate,
          endDate,
          trainers,
          coordinators,
          reviewers,
          trainees,
        },
        { abortEarly: false },
      )
      .then(() => {
        setEditBatchFormValues({
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
          setEditBatchFormValues({
            ...values,
            error: schemaErrors,
          });
        }
      });
  };

  const handleBatchNameChange = (event) => {
    setEditBatchFormValues({
      ...editBatchFormValues,
      batchName: event.target.value,
    });
    handleError({
      ...editBatchFormValues,
      batchName: event.target.value,
    });
  };

  const handleStartDateChange = (event) => {
    setEditBatchFormValues({
      ...editBatchFormValues,
      startDate: event.target.value,
    });
    handleError({
      ...editBatchFormValues,
      startDate: event.target.value,
    });
  };

  const handleEndDateChange = (event) => {
    setEditBatchFormValues({
      ...editBatchFormValues,
      endDate: event.target.value,
    });
    handleError({
      ...editBatchFormValues,
      endDate: event.target.value,
    });
  };

  const handleTrainerChange = (event) => {
    setEditBatchFormValues({
      ...editBatchFormValues,
      trainers: event.target.value,
    });
    handleError({
      ...editBatchFormValues,
      trainers: event.target.value,
    });
  };

  const handleCoordinatorChange = (event) => {
    setEditBatchFormValues({
      ...editBatchFormValues,
      coordinators: event.target.value,
    });
    handleError({
      ...editBatchFormValues,
      coordinators: event.target.value,
    });
  };

  const handleReviewerChange = (event) => {
    setEditBatchFormValues({
      ...editBatchFormValues,
      reviewers: event.target.value,
    });
    handleError({
      ...editBatchFormValues,
      reviewers: event.target.value,
    });
  };

  const handleTraineeChange = (event) => {
    setEditBatchFormValues({
      ...editBatchFormValues,
      trainees: event.target.value,
    });
    handleError({
      ...editBatchFormValues,
      trainees: event.target.value,
    });
  };

  const handleOnBlur = (event, type) => {
    isTouched[type] = true;
    const newValue = {
      ...editBatchFormValues,
      isTouched,
    };
    setEditBatchFormValues(newValue);
    handleError(newValue);
  };

  const getError = (type) => {
    if (isTouched[type]) {
      return error[type] || '';
    }
    return '';
  };

  const handleOnSubmit = async (originalId) => {
    try {
      const output = await updatedBatch({
        variables: {
          input: {
            originalId,
            batchName,
            startDate,
            endDate,
            reviewers,
            trainers,
            coordinators,
            trainees,
          },
        },
      });
      console.log(output, 'batch edited successfully', 'success');
      onSubmit();
    } catch (responseError) {
      console.log('CATCH BLOCK : editBatch handleOnSubmit => ', responseError);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setAuthenticated(true);
    }
  }, [navigate, authenticated]);

  const emptyField = (editBatchFormValues?.batchName?.length === 0
    || editBatchFormValues?.startDate?.length === 0
    || editBatchFormValues?.endDate?.length === 0
    || editBatchFormValues?.trainers?.length === 0
    || editBatchFormValues?.coordinators?.length === 0
    || editBatchFormValues?.reviewers?.length === 0
    || editBatchFormValues?.trainees?.length === 0);

  const currentData = {
    batchName: editBatchFormValues?.batchName,
    startDate: editBatchFormValues?.startDate,
    endDate: editBatchFormValues?.endDate,
    trainers: editBatchFormValues?.trainers,
    coordinators: editBatchFormValues?.coordinators,
    reviewers: editBatchFormValues?.reviewers,
    trainees: editBatchFormValues?.trainees,
  };

  return (
    <Dialog open={batchEditDialog}>
      <DialogTitle>Edit Batch</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter your Batch Details</DialogContentText>
        <Grid container>
          <Grid item xs={11.64}>
            <TextField
              sx={{ m: 1 }}
              id="outlined-basic"
              fullWidth
              label="Batch Name"
              defaultValue={data.batchName}
              InputProps={{
                style: {
                  padding: '10px 10px 10px 10px',
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <GroupIcon />
                  </InputAdornment>
                ),
              }}
              onChange={handleBatchNameChange}
              onBlur={(event) => {
                handleOnBlur(event, 'batchName');
              }}
              error={getError('batchName')}
              helperText={getError('batchName')}
            />
          </Grid>
          <Grid item xs={11.64}>
            <TextField
              sx={{ m: 1 }}
              id="outlined-basic"
              fullWidth
              defaultValue={data.startDate}
              label="Start Date"
              InputProps={{
                style: {
                  padding: '10px 10px 10px 10px',
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <DateRangeIcon />
                  </InputAdornment>
                ),
              }}
              onChange={handleStartDateChange}
              onBlur={(event) => {
                handleOnBlur(event, 'startDate');
              }}
              error={getError('startDate')}
              helperText={getError('startDate')}
            />
          </Grid>
          <Grid item xs={11.64}>
            <TextField
              sx={{ m: 1 }}
              id="outlined-basic"
              fullWidth
              defaultValue={data.endDate}
              label="End Date"
              InputProps={{
                style: {
                  padding: '10px 10px 10px 10px',
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <DateRangeIcon />
                  </InputAdornment>
                ),
              }}
              onChange={handleEndDateChange}
              onBlur={(event) => {
                handleOnBlur(event, 'endDate');
              }}
              error={getError('endDate')}
              helperText={getError('endDate')}
            />
          </Grid>
          <Grid item xs={11.64}>
            <TextField
              sx={{ m: 1 }}
              id="outlined-basic"
              fullWidth
              defaultValue={data.trainers}
              label="Trainers"
              InputProps={{
                style: {
                  padding: '10px 10px 10px 10px',
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              onChange={handleTrainerChange}
              onBlur={(event) => {
                handleOnBlur(event, 'trainers');
              }}
              error={getError('trainers')}
              helperText={getError('trainers')}
            />
          </Grid>
          <Grid item xs={11.64}>
            <TextField
              sx={{ m: 1 }}
              id="outlined-basic"
              fullWidth
              label="Coordinators"
              defaultValue={data.coordinators}
              InputProps={{
                style: {
                  padding: '10px 10px 10px 10px',
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              onChange={handleCoordinatorChange}
              onBlur={(event) => {
                handleOnBlur(event, 'coordinators');
              }}
              error={getError('coordinators')}
              helperText={getError('coordinators')}
            />
          </Grid>
          <Grid item xs={11.64}>
            <TextField
              sx={{ m: 1 }}
              id="outlined-basic"
              fullWidth
              defaultValue={data.reviewers}
              label="Reviewers"
              InputProps={{
                style: {
                  padding: '10px 10px 10px 10px',
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              onChange={handleReviewerChange}
              onBlur={(event) => {
                handleOnBlur(event, 'reviewers');
              }}
              error={getError('reviewers')}
              helperText={getError('reviewers')}
            />
          </Grid>
          <Grid item xs={11.64}>
            <TextField
              sx={{ m: 1 }}
              id="outlined-basic"
              fullWidth
              defaultValue={data.trainees}
              label="Trainees"
              InputProps={{
                style: {
                  padding: '10px 10px 10px 10px',
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <GroupIcon />
                  </InputAdornment>
                ),
              }}
              onChange={handleTraineeChange}
              onBlur={(event) => {
                handleOnBlur(event, 'trainees');
              }}
              error={getError('trainees')}
              helperText={getError('trainees')}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          style={{ padding: '10px 10px 10px 10px', marginBottom: '10px' }}
          variant="outlined"
          onClick={onClose}
        >
          Cancel
        </Button>
        <LoadingButton
          style={{ padding: '10px 10px 10px 10px', marginRight: '25px', marginBottom: '10px' }}
          variant="contained"
          loading={loading}
          onClick={() => handleOnSubmit(data.originalId)}
          disabled={emptyField
            || (data.batchName === currentData.batchName && data.startDate === currentData.startDate
              && data.endDate === currentData.endDate && data.trainers === currentData.trainers
              && data.coordinators === currentData.coordinators
              && data.reviewers === currentData.reviewers
              && data.trainees === currentData.trainees
            )}
        >
          Submit
        </LoadingButton>
        <Divider />
      </DialogActions>
    </Dialog>
  );
};

EditBatch.propTypes = {
  batchEditDialog: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.objectOf.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default React.memo(EditBatch);
