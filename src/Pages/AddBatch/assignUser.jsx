import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box, TextField, Checkbox, OutlinedInput, InputLabel, MenuItem,
  FormControl, FormHelperText, ListItemText, Select, Grid,
} from '@mui/material';
import AddBatchTable from './AddBatchTable';
import { addBatchTableColumns, MenuProps } from '../../Config/constant';

const AssignUser = (props) => {
  const {
    data = [],
    newUsers = [],
    assignR,
    handleSelect,
    index,
    setIndex,
    batchName,
    handleOnSelectCoordinatorChange,
    handleOnSelectTrainer,
    handleOnBatchName,
    handleValidation,
    errorMessage,
    coordinators,
    trainers,
    reviewers,
  } = props;

  if (index != null) {
    useEffect(() => {
      const teamDetails = {
        assignedTrainees: data[index]?.email,
        reviewer: assignR,
      };
      reviewers.push(teamDetails);
    }, [index]);
  }

  const selectedUserName = (ids) => ids.reduce((acc, current) => {
    const { name } = newUsers.find((el) => el.originalId === current);
    acc.push(name);
    return acc;
  }, []).join();

  return (
    <>
      <>
        <Grid
          container
          direction="row"
          alignItems="flex-end"
          justifyContent="center"
          spacing={6}
        >
          <Grid item xs="auto" sx={{ left: 30, top: '10px' }}>
            <b style={{ lineHeight: 2.5 }}>Batch Name:</b>
            <FormControl>
              <TextField
                size="small"
                id="outlined-basic"
                label="Batch Name"
                variant="outlined"
                value={batchName}
                onChange={(event) => {
                  handleOnBatchName(event);
                  handleValidation(event.target.value, 'batchName');
                }}
                onFocus={(event) => handleValidation(event.target.value, 'batchName')}
              />
              <FormHelperText sx={{ color: 'red' }}>
                {errorMessage && errorMessage.batchName}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid>
            <b>&nbsp;&nbsp;Training Coordinator:&nbsp;&nbsp;</b>
            <FormControl>
              <Select
                size="small"
                sx={{ width: 250 }}
                label="Please select"
                multiple
                value={coordinators}
                onChange={(event) => {
                  handleOnSelectCoordinatorChange(event);
                }}
                input={<OutlinedInput />}
                renderValue={(selected) => selectedUserName(selected)}
                MenuProps={MenuProps}
                onBlur={(event) => handleValidation(event.target.value, 'coordinators')}
              >
                {newUsers.map(({ name, originalId }) => (
                  <MenuItem key={originalId} value={originalId}>
                    <Checkbox checked={coordinators.indexOf(originalId) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText sx={{ color: 'red' }}>
                {errorMessage && errorMessage.coordinators}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid>
            <b>&nbsp;&nbsp;Trainer:&nbsp;&nbsp;</b>
            <FormControl>
              <Select
                size="small"
                label="Select"
                sx={{ width: 250 }}
                multiple
                value={trainers}
                onChange={(event) => {
                  handleOnSelectTrainer(event);
                }}
                input={<OutlinedInput />}
                renderValue={(selected) => selectedUserName(selected)}
                MenuProps={MenuProps}
                onBlur={(event) => handleValidation(event.target.value, 'trainers')}
              >
                {newUsers.map(({ name, originalId }) => (
                  <MenuItem key={name} value={originalId}>
                    <Checkbox checked={trainers.indexOf(originalId) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText sx={{ color: 'red' }}>
                {errorMessage && errorMessage.trainers}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <br />
        <br />
        <AddBatchTable
          data={data}
          columns={addBatchTableColumns}
          setIndex={setIndex}
          actions={[
            {
              icon: (
                <Box sx={{ minWidth: 90 }}>
                  <FormControl fullWidth>
                    <InputLabel>Please select</InputLabel>
                    <Select
                      size="small"
                      label="Select"
                      value={assignR[index]}
                      onChange={(event) => {
                        handleSelect(event);
                      }}
                    >
                      {newUsers.map(({ name, originalId }) => (
                        <MenuItem key={name} value={originalId}>{name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              ),
            },
          ]}
        />
      </>
    </>
  );
};

AssignUser.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  newUsers: PropTypes.arrayOf(PropTypes.string),
  handleOnSelectTrainer: () => {},
  handleOnSelectCoordinatorChange: () => {},
  handleOnBatchName: () => {},
  batchName: PropTypes.string,
  trainers: PropTypes.arrayOf(PropTypes.string),
  coordinators: PropTypes.arrayOf(PropTypes.string),
  handleValidation: () => {},
  errorMessage: () => {},
  handleSelect: () => {},
  assignR: PropTypes.string,
  index: PropTypes.string,
  setIndex: () => {},
  reviewers: PropTypes.arrayOf(PropTypes.string),
};

AssignUser.defaultProps = {
  batchName: '',
  data: [],
  newUsers: [],
  trainers: [],
  coordinators: [],
  handleOnBatchName: () => {},
  handleOnSelectCoordinatorChange: () => {},
  errorMessage: () => {},
  handleOnSelectTrainer: () => {},
  handleValidation: () => {},
  assignR: '',
  handleSelect: () => {},
  index: '',
  setIndex: () => {},
  reviewers: [],
};

export default React.memo(AssignUser);
