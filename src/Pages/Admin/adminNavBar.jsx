import React, { useState, useEffect } from 'react';
import {
  AppBar, Tooltip, Box, Toolbar, Container, IconButton, Typography, Menu, Avatar, MenuItem,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import {
  compactStyle, landscapeLogoCss, navStyle, compactMenu,
} from './style';

const pages = ['Admin', 'UserManagement'];

const AdminNavbar = () => {
  const [navbar, setNavbar] = useState(false);
  const [profile, setProfile] = useState(false);

  const [authenticated, setAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setAuthenticated(true);
    } else {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleNavMenu = () => {
    setNavbar((val) => !val);
  };

  const handleProfileMenu = () => {
    setProfile((value) => !value);
  };

  if (authenticated) {
    return (
      <AppBar position="static" style={navStyle}>
        <Container maxWidth="xl">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={landscapeLogoCss}
            >
              Training Feedback
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                onClick={handleNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={navbar}
                onClose={handleNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none', marginTop: '50px' },
                }}
              >
                {pages.map((page) => (
                  <Link to={`/${page}`} style={{ color: 'Black', textDecoration: 'none' }}>
                    <Typography style={{ padding: '10px' }}>
                      {page === 'Admin' ? 'Dashboard' : page}
                    </Typography>
                  </Link>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href=""
              className="compact"
              sx={compactStyle}
            >
              Training Feedback
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Link to={`/${page}`} style={{ color: 'white', textDecoration: 'none' }}>
                  <Typography style={{ paddingRight: '10px', paddingLeft: '10px' }}>
                    {page === 'Admin' ? 'Dashboard' : page}
                  </Typography>
                </Link>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleProfileMenu} sx={{ p: 0 }}>
                  <Avatar alt={`${localStorage.getItem('name')}`} src={`${localStorage.getItem('avatar')}`} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorOrigin={compactMenu}
                keepMounted
                transformOrigin={compactMenu}
                open={profile}
                onClose={handleProfileMenu}
              >
                <MenuItem key={navbar} onClick={handleProfileMenu}>
                  <MenuItem>
                    <Link
                      to="/"
                      onClick={() => {
                        localStorage.clear();
                      }}
                      style={{ color: 'black', textDecoration: 'none' }}
                    >
                      <Typography textAlign="center">Logout</Typography>
                    </Link>
                  </MenuItem>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
  return <div />;
};

export default AdminNavbar;
