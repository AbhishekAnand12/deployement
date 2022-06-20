import React, { useState } from 'react';
import {
  Grid, Dialog, DialogContent, DialogContentText,
  DialogTitle, TextField, DialogActions,
  Button, InputAdornment, Divider,
} from '@mui/material';
import PropTypes from 'prop-types';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import BusinessIcon from '@mui/icons-material/Business';
import BadgeIcon from '@mui/icons-material/Badge';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../ApolloClient';
import addUserState from './constant';
import addUserValidationSchema from './yup';

const AddUser = (props) => {
  const { onClose, onSubmit, open } = props;
  const [addUserData] = useMutation(CREATE_USER);

  const [addUserFormValue, setAddUserFormValues] = useState(addUserState);
  const {
    name,
    email,
    isTouched,
    error,
    department,
    contactNo,
    location,
    empId,
    isDisabled,
  } = addUserFormValue;

  const handleError = (values) => {
    addUserValidationSchema
      .validate(
        {
          ...values,
        },
        { abortEarly: false },
      )
      .then(() => {
        setAddUserFormValues({
          ...values,
          isDisabled: false,
          error: {},
        });
      })
      .catch((allErrors) => {
        const schemaErrors = {};
        if (allErrors) {
          allErrors.inner.forEach((err) => {
            schemaErrors[err.path] = err.message;
          });
          setAddUserFormValues({
            ...values,
            isDisabled: true,
            error: schemaErrors,
          });
        }
      });
  };

  const handleNameChange = (e) => {
    setAddUserFormValues({
      ...addUserFormValue,
      name: e.target.value,
    });
    handleError({
      ...addUserFormValue,
      name: e.target.value,
    });
  };

  const handleEmailChange = (e) => {
    setAddUserFormValues({
      ...addUserFormValue,
      email: e.target.value,
    });
    handleError({
      ...addUserFormValue,
      email: e.target.value,
    });
  };

  const handleDepartmentChange = (e) => {
    setAddUserFormValues({
      ...addUserFormValue,
      department: e.target.value,
    });
    handleError({
      ...addUserFormValue,
      department: e.target.value,
    });
  };

  const handleContactNoChange = (e) => {
    setAddUserFormValues({
      ...addUserFormValue,
      contactNo: e.target.value,
    });
    handleError({
      ...addUserFormValue,
      contactNo: e.target.value,
    });
  };

  const handleLocationChange = (e) => {
    setAddUserFormValues({
      ...addUserFormValue,
      location: e.target.value,
    });
    handleError({
      ...addUserFormValue,
      location: e.target.value,
    });
  };

  const handleEmpIdChange = (e) => {
    setAddUserFormValues({
      ...addUserFormValue,
      empId: e.target.value,
    });
    handleError({
      ...addUserFormValue,
      empId: e.target.value,
    });
  };

  const handleOnBlur = (event, type) => {
    const { value } = event.target;
    if (value === '') {
      isTouched[type] = true;
      const newValue = {
        ...addUserFormValue,
        isTouched,
      };
      setAddUserFormValues(newValue);
      handleError(newValue);
    }
  };

  const getError = (type) => {
    if (isTouched[type]) {
      return error[type] || '';
    }
    return '';
  };

  const handleOnSubmit = async () => {
    try {
      const output = await addUserData({
        variables: {
          input: {
            name,
            email,
            department,
            location,
            contactNo,
            empId,
          },
        },
      });

      console.log('00000000000000000000', output);
      onSubmit();
    } catch (catchError) {
      console.log('CATCH BLOCK: handleOnSubmit AddUser => ', catchError);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Add User</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter your User Details</DialogContentText>
        <Grid container>
          <Grid item xs={11.64}>
            <TextField
              sx={{ m: 1 }}
              id="outlined-basic"
              fullWidth
              label="Name"
              InputProps={{
                style: {
                  padding: '1px 1px 1px 10px',
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
              label="Email Address"
              InputProps={{
                style: {
                  padding: '1px 1px 1px 10px',
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
              label="Location"
              InputProps={{
                style: {
                  padding: '1px 1px 1px 1px',
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
              label="Contact Number"
              InputProps={{
                style: {
                  padding: '1px 1px 1px 10px',
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
              InputProps={{
                style: {
                  padding: '1px 1px 1px 10px',
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
              label="EMP ID"
              InputProps={{
                style: {
                  padding: '1px 1px 1px 10px',
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
        <Button
          style={{ padding: '10px 10px 10px 10px', marginRight: '25px', marginBottom: '10px' }}
          variant="contained"
          onClick={() => handleOnSubmit()}
          disabled={isDisabled}
        >
          Submit
        </Button>
        <Divider />
      </DialogActions>
    </Dialog>
  );
};

AddUser.propTypes = {
  open: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default React.memo(AddUser);
