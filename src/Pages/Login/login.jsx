import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper, Grid, Box, Typography, Avatar,
} from '@mui/material';
import { GoogleLogin } from 'react-google-login';
import { useMutation } from '@apollo/client';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import config from '../../Config/config';
import ToastContext from '../../contexts/SnackBarProvider/ToastContext';
import { GOOGLE_LOGIN } from '../../ApolloClient';
import { loginPage } from '../../Config/constant';

const paperStyle = {
  backgroundColor: '#F5F5F5',
  padding: '20',
  height: 500,
  width: 330,
  margin: '15vh auto',
};

const Login = () => {
  const navigation = useNavigate();
  const snackBar = useContext(ToastContext);

  const [googleLogin] = useMutation(GOOGLE_LOGIN);
  const responseSuccessGoogle = async (response) => {
    const output = await googleLogin({
      variables: {
        input: {
          tokenId: response.tokenId,
        },
      },
    });
    localStorage.setItem('name', response.profileObj.name);
    localStorage.setItem('avatar', response?.profileObj?.imageUrl);
    localStorage.setItem('role', output?.data?.googleLogin?.role);
    localStorage.setItem('accessToken', output?.data?.googleLogin?.token);
    navigation(`${output?.data?.googleLogin?.role}`, { replace: true });
    snackBar(`${response.profileObj.name} Login Successfully as a ${output?.data?.googleLogin?.role}`, 'success');
  };
  const responseFailGoogle = (response) => {
    snackBar(`${response.profileObj.name} try with different credentials`, 'error');
  };

  return (
    <Grid>
      <Paper style={paperStyle} elevation={8}>
        <Grid align="center" marginBottom="20px" style={{ paddingTop: '40px' }}>
          <Avatar sx={{ backgroundColor: '#4682B4' }}>
            <LoginRoundedIcon />
          </Avatar>
          <Typography variant="h6">
            Login Here
          </Typography>
        </Grid>
        <Grid align="center">
          <Box
            component="img"
            sx={{
              height: 200,
              width: 150,
            }}
            alt="Successive Technology"
            src={loginPage}
          />
          <div style={{
            marginTop: '3vh',
          }}
          >
            <GoogleLogin
              clientId={config.googleClientId}
              onSuccess={responseSuccessGoogle}
              onFailure={responseFailGoogle}
            />
          </div>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Login;
