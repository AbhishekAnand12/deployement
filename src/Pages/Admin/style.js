import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

export const landscapeLogoCss = {
  mr: 2,
  display: { xs: 'none', md: 'flex' },
  fontFamily: 'sans',
  fontWeight: 700,
  letterSpacing: '.1rem',
  color: 'inherit',
  textDecoration: 'none',
  textTransform: 'none',
};

export const compactStyle = {
  mr: 2,
  display: { xs: 'flex', md: 'none' },
  flexGrow: 1,
  fontFamily: 'sans',
  fontWeight: 700,
  letterSpacing: '.1rem',
  color: 'inherit',
  textDecoration: 'none',
  textTransform: 'none',
};

export const navStyle = {
  textTransform: 'none',
  backgroundColor: '#121212',
  color: 'white',
};

export const compactMenu = {
  textTransform: 'none',
  vertical: 'top',
  horizontal: 'right',
};

export const addBatchButton = {
  float: 'right',
  marginRight: '30px',
  backgroundColor: '#262626',
  color: 'white',
  borderRadius: '90px',
  fontSize: '0.9333333333333333rem',
  lineHeight: '1.75',
  textTransform: 'uppercase',
  padding: '5px 15px',
};

export const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export const adminSearchBar = {
  float: 'left',
  marginRight: '30px',
  lineHeight: '1.75',
  padding: '5px 15px',
};

export const userManagementSearchBar = {
  float: 'left',
  display: 'flex',
  flexDirection: 'left',
};

export const addUserButton = {
  float: 'right',
  position: 'absolute',
  right: '5rem',
  backgroundColor: '#262626',
  color: 'white',
  borderRadius: '10px',
  margin: '0 12%',
  padding: '10px 25px',
};

export const addBulkUsersButton = {
  float: 'right',
  position: 'absolute',
  right: '1rem',
  backgroundColor: '#262626',
  color: 'white',
  borderRadius: '10px',
  margin: '0 20px',
  padding: '10px 25px',
};
