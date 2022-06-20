import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import GenericTable from '../../Components/Table/table';

const Reviewer = () => {
  const [data, setData] = useState();
  const [status, setStatus] = React.useState('');

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const column = [
    {
      label: 'Trainee Name',
      field: 'traineeName',
    },
    {
      label: 'Training Cordinator',
      field: 'trainingCordinator',
    },
    {
      label: 'Department',
      field: 'department',
    },
    {
      label: 'Reviewer',
      field: 'reviewer',
    },
  ];
  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://628723a27864d2883e7f1d2e.mockapi.io/api/reviewer/reviewer',
    })
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((Error) => {
        console.error('Error :: ', Error);
      });
  }, []);
  return (
    <>
      <Box sx={{ float: 'right' }}>
        <FormControl>
          <InputLabel>FeedbackStatus</InputLabel>
          <Select
            value={status}
            label="FeedbackStatus"
            onChange={handleChange}
            sx={{ width: 170 }}
            size="small"
          >

            <MenuItem value="submited">Submitted</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <b>Trainee List</b>
      <p>
        <Divider />
      </p>
      <GenericTable
        columns={column}
        data={data || []}
      />
    </>
  );
};
export default Reviewer;
