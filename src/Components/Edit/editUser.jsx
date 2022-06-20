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
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import BusinessIcon from '@mui/icons-material/Business';
import BadgeIcon from '@mui/icons-material/Badge';
import { UPDATE_USER } from '../../ApolloClient/mutation';

const EditUser = (props) => {
  const {
    userEditDialog, onClose, onSubmit, data = {},
  } = props;

  const [updateUser, { loading }] = useMutation(UPDATE_USER);

  const initialState = {
    name: data?.name,
    email: data?.email,
    department: data?.department,
    contactNo: data?.contactNo,
    location: data?.location,
    empId: data?.empId,
    isTouched: {},
    error: {},
  };

  const [authenticated, setAuthenticated] = useState(false);
  const [editFormValues, setEditFormValues] = useState(initialState);

  const {
    name,
    email,
    isTouched,
    error,
    department,
    contactNo,
    location,
    empId,
  } = editFormValues;

  const editUserValidationSchema = yup.object({
    name: yup.string().label('Name').required(),
    email: yup.string().email().label('Email Address').required(),
    location: yup.string().label('Location').required(),
    department: yup.string().label('Department').required(),
    contactNo: yup.string().label('Contact Number').required(),
    empId: yup.string().label('EMP ID').required(),
  });

  const handleError = (values) => {
    editUserValidationSchema
      .validate(
        {
          name,
          email,
          department,
          contactNo,
          location,
          empId,
        },
        { abortEarly: false },
      )
      .then(() => {
        setEditFormValues({
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
          setEditFormValues({
            ...values,
            error: schemaErrors,
          });
        }
      });
  };

  const handleNameChange = (e) => {
    setEditFormValues({
      ...editFormValues,
      name: e.target.value,
    });
    handleError({
      ...editFormValues,
      name: e.target.value,
    });
  };

  const handleEmailChange = (e) => {
    setEditFormValues({
      ...editFormValues,
      email: e.target.value,
    });
    handleError({
      ...editFormValues,
      email: e.target.value,
    });
  };

  const handleDepartmentChange = (e) => {
    setEditFormValues({
      ...editFormValues,
      department: e.target.value,
    });
    handleError({
      ...editFormValues,
      department: e.target.value,
    });
  };

  const handleContactNoChange = (e) => {
    setEditFormValues({
      ...editFormValues,
      contactNo: e.target.value,
    });
    handleError({
      ...editFormValues,
      contactNo: e.target.value,
    });
  };

  const handleLocationChange = (e) => {
    setEditFormValues({
      ...editFormValues,
      location: e.target.value,
    });
    handleError({
      ...editFormValues,
      location: e.target.value,
    });
  };

  const handleEmpIdChange = (e) => {
    setEditFormValues({
      ...editFormValues,
      empId: e.target.value,
    });
    handleError({
      ...editFormValues,
      empId: e.target.value,
    });
  };

  const handleOnBlur = (event, type) => {
    isTouched[type] = true;
    const newValue = {
      ...editFormValues,
      isTouched,
    };
    setEditFormValues(newValue);
    handleError(newValue);
  };

  const getError = (type) => {
    if (isTouched[type]) {
      return error[type] || '';
    }
    return '';
  };

  const handleOnSubmit = async (originalId) => {
    await updateUser({
      variables: {
        input: {
          originalId,
          name,
          email,
          department,
          contactNo,
          location,
          empId,
        },
      },
    }).then((response) => {
      setAuthenticated(true);
      console.log(response, 'user edited successfully');
      onSubmit();
    }).catch((err) => {
      console.log('CATCH BLOCK : in EditDialog.js .then => ', err);
      onSubmit();
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setAuthenticated(true);
    }
  }, [navigate, authenticated]);

  const regex = /[a-z0-9A-Z]+@successive.tech$/;
  const emptyField = !!(editFormValues?.name?.length === 0
    || editFormValues?.location?.length === 0
    || editFormValues?.empId?.length === 0
    || editFormValues?.contactNo?.length === 0
    || editFormValues?.department?.length === 0
    || editFormValues?.email?.length === 0
    || !regex.test(editFormValues?.email));

  const currentData = {
    name: editFormValues?.name,
    email: editFormValues?.email,
    empId: editFormValues?.empId,
    location: editFormValues?.location,
    contactNo: editFormValues?.contactNo,
    department: editFormValues?.department,
  };

  return (
    <Dialog open={userEditDialog}>
      <DialogTitle>Edit user</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter your User Details</DialogContentText>
        <Grid container>
          <Grid item xs={11.64}>
            <TextField
              sx={{ m: 1 }}
              id="outlined-basic"
              fullWidth
              label="Name"
              defaultValue={data.name}
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
              onChange={handleNameChange}
              onBlur={(event) => {
                handleOnBlur(event, 'name');
              }}
              error={getError('name')}
              helperText={getError('name')}
            />
          </Grid>
          <Grid item xs={11.64}>
            <TextField
              sx={{ m: 1 }}
              id="outlined-basic"
              fullWidth
              defaultValue={data.email}
              label="Email Address"
              InputProps={{
                style: {
                  padding: '10px 10px 10px 10px',
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              onChange={handleEmailChange}
              onBlur={(event) => {
                handleOnBlur(event, 'email');
              }}
              error={getError('email')}
              helperText={getError('email')}
            />
          </Grid>
          <Grid item xs={11.64}>
            <TextField
              sx={{ m: 1 }}
              id="outlined-basic"
              fullWidth
              defaultValue={data.location}
              label="Location"
              InputProps={{
                style: {
                  padding: '10px 10px 10px 10px',
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon />
                  </InputAdornment>
                ),
              }}
              onChange={handleLocationChange}
              onBlur={(event) => {
                handleOnBlur(event, 'location');
              }}
              error={getError('location')}
              helperText={getError('location')}
            />
          </Grid>
          <Grid item xs={11.64}>
            <TextField
              sx={{ m: 1 }}
              id="outlined-basic"
              fullWidth
              defaultValue={data.contactNo}
              label="Contact Number"
              InputProps={{
                style: {
                  padding: '10px 10px 10px 10px',
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <CallIcon />
                  </InputAdornment>
                ),
              }}
              onChange={handleContactNoChange}
              onBlur={(event) => {
                handleOnBlur(event, 'contactNo');
              }}
              error={getError('contactNo')}
              helperText={getError('contactNo')}
            />
          </Grid>
          <Grid item xs={11.64}>
            <TextField
              sx={{ m: 1 }}
              id="outlined-basic"
              fullWidth
              label="Department"
              defaultValue={data.department}
              InputProps={{
                style: {
                  padding: '10px 10px 10px 10px',
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessIcon />
                  </InputAdornment>
                ),
              }}
              onChange={handleDepartmentChange}
              onBlur={(event) => {
                handleOnBlur(event, 'department');
              }}
              error={getError('department')}
              helperText={getError('department')}
            />
          </Grid>
          <Grid item xs={11.64}>
            <TextField
              sx={{ m: 1 }}
              id="outlined-basic"
              fullWidth
              defaultValue={data.empId}
              label="EMP ID"
              InputProps={{
                style: {
                  padding: '10px 10px 10px 10px',
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeIcon />
                  </InputAdornment>
                ),
              }}
              onChange={handleEmpIdChange}
              onBlur={(event) => {
                handleOnBlur(event, 'empId');
              }}
              error={getError('empId')}
              helperText={getError('empId')}
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
          onClick={() => handleOnSubmit()}
          disabled={emptyField
            || (data?.name === currentData?.name && data?.email === currentData?.email
              && data?.empId === currentData?.empId && data?.location === currentData?.location
              && data?.department === currentData?.department
            )}
        >
          Submit
        </LoadingButton>
        <Divider />
      </DialogActions>
    </Dialog>
  );
};

EditUser.propTypes = {
  userEditDialog: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.objectOf.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default React.memo(EditUser);
