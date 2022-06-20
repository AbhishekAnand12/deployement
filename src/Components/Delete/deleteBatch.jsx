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
import { DELETE_BATCH } from '../../ApolloClient/mutation';
import ToastContext from '../../contexts/SnackBarProvider/ToastContext';

const DeleteBatch = (props) => {
  const {
    onClose, batchRemoveDialog, data, onSubmit,
  } = props;

  const [deletedBatch] = useMutation(DELETE_BATCH);
  const snackBar = useContext(ToastContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const handleOnSubmit = async (originalId) => {
    try {
      setLoading(true);
      const response = await deletedBatch({
        variables: {
          input: {
            originalId,
          },
        },
      });
      if (response?.data?.deletedBatch?.status === 200) {
        setAuthenticated(true);
        snackBar('Batch deleted successfully', 'success');
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
    <Dialog open={batchRemoveDialog} onClose={onClose}>
      <DialogTitle>Delete Batch</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you really want to delete Batch?
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

DeleteBatch.propTypes = {
  batchRemoveDialog: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.objectOf.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default DeleteBatch;
