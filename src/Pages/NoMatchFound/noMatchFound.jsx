import React from 'react';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { noMatch } from '../../Config/constant';

const NoMatch = () => (
  <Typography>
    <center>
      <Box
        component="img"
        sx={{
          width: ' 100%',
          maxWidth: '30rem',
          height: 'auto',
        }}
        alt="new"
        src={noMatch}
      />
    </center>
    <center>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button variant="contained" startIcon={<HomeRoundedIcon />}>
          GO HOME
        </Button>
      </Link>
    </center>
  </Typography>
);

export default NoMatch;
