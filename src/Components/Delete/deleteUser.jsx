import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  DialogActions,
} from '@mui/material';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { DELETE_USER } from '../../ApolloClient/mutation';
import ToastContext from '../../contexts/SnackBarProvider/ToastContext';

const DeleteUser = (props) => {
  const {
    onClose, userRemoveDialog, data, onSubmit,
  } = props;

  const [deletedUser] = useMutation(DELETE_USER);
  const snackBar = useContext(ToastContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const handleOnSubmit = async (originalId) => {
    try {
      setLoading(true);
      const response = await deletedUser({
        variables: {
          input: {
            originalId,
          },
        },
      });
      if (response?.data?.deleteUser?.status === 200) {
        setAuthenticated(true);
        snackBar('User deleted successfully', 'success');
      }
      onSubmit();
      setLoading(false);
    } catch (err) {
      console.log('CATCH BLOCK : in RemoveDialog.jsx .then => ', err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setAuthenticated(true);
    }
  }, [navigate, authenticated]);

  return (
    <Dialog open={userRemoveDialog} onClose={onClose}>
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you really want to delete User?
        </DialogContentText>
        <br />
        <DialogActions>
          <LoadingButton
            variant="contained"
            loading={loading}
            onClick={() => handleOnSubmit(data.originalId)}
          >
            Delete
          </LoadingButton>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

DeleteUser.propTypes = {
  userRemoveDialog: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.objectOf.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
export default DeleteUser;
