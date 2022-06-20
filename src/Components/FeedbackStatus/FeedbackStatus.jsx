import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const BasicSelect = () => {
  const [status, setStatus] = React.useState('');

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
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
  );
};

export default BasicSelect;
