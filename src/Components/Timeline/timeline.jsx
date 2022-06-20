/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  Paper, Grid, FormControl, Select,
  MenuItem, InputLabel, FormHelperText,
} from '@mui/material';
import timelinePaper from './style';

const Timeline = (props) => {
  const {
    startDate,
    handleOnStartDate,
    endDate,
    handleOnEndDate,
    handleValidation,
    errorMessage,
    fbIntervalTC,
    fbIntervalR,
    fbIntervalT,
    handleOnfbIntervalTC,
    handleOnfbIntervalR,
    handleOnfbIntervalT,
  } = props;

  return (
    <>
      <Paper
        sx={timelinePaper}
      >
        <h4 style={{ display: 'flex', justifyContent: 'center' }}>Training Duration</h4>
        <Grid container item spacing={1}>
          <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'row' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <b style={{ lineHeight: 2.5 }}>Start Date :&nbsp;</b>
              <br />
              <DatePicker
                sx={{ float: 'left', display: 'flex' }}
                label="Start Date"
                size="small"
                value={startDate}
                onChange={(newValue) => handleOnStartDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'row' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <b style={{ lineHeight: 2.5 }}>End Date :&nbsp;</b>
              <br />
              <DatePicker
                sx={{ float: 'left', display: 'flex' }}
                label="End Date"
                size="small"
                value={endDate}
                onChange={(newValue) => handleOnEndDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Paper>
      <br />
      <Paper
        sx={timelinePaper}
      >
        <h4 style={{ display: 'flex', justifyContent: 'center' }}>Feedback Interval</h4>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Grid item xs="auto" sx={{ left: 100, top: '10px' }}>
            <b style={{ lineHeight: 3.5 }}>Coordinator: </b>
            <FormControl sx={{ m: 1 }} size="small">
              <InputLabel id="demo-select-small">Select</InputLabel>
              <Select
                sx={{ width: 150 }}
                size="small"
                value={fbIntervalTC}
                label="Select"
                onChange={(event) => {
                  handleOnfbIntervalTC(event);
                  handleValidation(event.target.value, 'fbIntervalTC');
                }}
                onBlur={(event) => handleValidation(event.target.value, 'fbIntervalTC')}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Bi-Weekly">Bi-Weekly</MenuItem>
                <MenuItem value="Weekly">Weekly</MenuItem>
              </Select>
              <FormHelperText sx={{ color: 'red' }}>
                {errorMessage && errorMessage.fbIntervalTC}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs="auto">
            <b style={{ lineHeight: 3.5 }}>Reviewer: </b>
            <FormControl sx={{ m: 1 }} size="small">
              <InputLabel id="demo-select-small">Select</InputLabel>
              <Select
                sx={{ width: 150 }}
                size="small"
                value={fbIntervalR}
                label="Select"
                onChange={(event) => {
                  handleOnfbIntervalR(event);
                  handleValidation(event.target.value, 'fbIntervalR');
                }}
                onBlur={(event) => handleValidation(event.target.value, 'fbIntervalR')}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Bi-Weekly">Bi-Weekly</MenuItem>
                <MenuItem value="Weekly">Weekly</MenuItem>
              </Select>
              <FormHelperText sx={{ color: 'red' }}>
                {errorMessage && errorMessage.fbIntervalR}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs="auto">
            <b style={{ lineHeight: 3.5 }}>Trainee: </b>
            <FormControl sx={{ m: 1 }} size="small">
              <InputLabel id="demo-select-small">Select</InputLabel>
              <Select
                sx={{ width: 150 }}
                size="small"
                value={fbIntervalT}
                label="Select"
                onChange={(event) => {
                  handleOnfbIntervalT(event);
                  handleValidation(event.target.value, 'fbIntervalT');
                }}
                onBlur={(event) => handleValidation(event.target.value, 'fbIntervalT')}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Bi-Weekly">Bi-Weekly</MenuItem>
                <MenuItem value="Weekly">Weekly</MenuItem>
              </Select>
              <FormHelperText sx={{ color: 'red' }}>
                {errorMessage && errorMessage.fbIntervalT}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      <br />
      <br />
    </>
  );
};

Timeline.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  fbIntervalTC: PropTypes.string,
  fbIntervalR: PropTypes.string,
  fbIntervalT: PropTypes.string,
  handleOnStartDate: () => {},
  handleOnEndDate: () => {},
  handleOnfbIntervalTC: () => {},
  handleOnfbIntervalR: () => {},
  handleOnfbIntervalT: () => {},
  handleValidation: () => {},
  errorMessage: () => {},
};

Timeline.defaultProps = {
  startDate: '',
  endDate: '',
  fbIntervalTC: '',
  fbIntervalR: '',
  fbIntervalT: '',
  handleOnStartDate: () => {},
  handleOnEndDate: () => {},
  handleOnfbIntervalTC: () => {},
  handleOnfbIntervalR: () => {},
  handleOnfbIntervalT: () => {},
  handleValidation: () => {},
  errorMessage: () => {},

};

export default React.memo(Timeline);
