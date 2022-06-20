import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';

const Batch = (props) => {
  const { batchname, handleonBatchChange } = props;
  return (
    <div style={{ width: '100%', height: '100%' }}>
      BatchName:
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        align="center"
        size="small"
        onChange={handleonBatchChange}
        sx={{ mt: 1, mr: 20, width: '20ch' }}
      >
        {batchname.map(({
          batchName, originalId,
        }) => (
          <MenuItem value={originalId}>
            {batchName}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

Batch.propTypes = {
  batchname: PropTypes.arrayOf(PropTypes.string),
  handleonBatchChange: PropTypes.func.isRequired,
};

Batch.defaultProps = {
  batchname: [],
};
export default Batch;
