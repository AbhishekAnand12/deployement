import React, { useState } from 'react';
import {
  AppBar, Tooltip, Box, Toolbar, Container, IconButton, Typography, Menu, Avatar, Button, MenuItem,
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import {
  compactStyle, landscapeLogoCss, navStyle, compactMenu,
} from './style';

export default () => {
  const [navbar, setNavbar] = useState(false);
  const [profile, setProfile] = useState(false);

  const handleNavMenu = () => {
    setNavbar((val) => !val);
  };

  const handleProfileMenu = () => {
    setProfile((value) => !value);
  };

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
              <Link to={`/${localStorage.getItem('role')}`} style={{ color: 'white', textDecoration: 'none' }}>
                <Typography style={{ color: 'black', padding: '10px' }}>Dashboard</Typography>
              </Link>
              <Link to={`/${localStorage.getItem('role')}/Feedback`} style={{ color: 'white', textDecoration: 'none' }}>
                <Typography style={{ color: 'black', padding: '10px' }}>Add Feedback</Typography>
              </Link>
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
            <Link to={`/${localStorage.getItem('role')}`} style={{ color: 'white', textDecoration: 'none' }}>
              <Button color="inherit">
                Dashboard
              </Button>
            </Link>
            <Link to={`/${localStorage.getItem('role')}/Feedback`} style={{ color: 'white', textDecoration: 'none' }}>
              <Button color="inherit">Add Feedback</Button>
            </Link>
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
              <MenuItem>
                <Link
                  to="/"
                  onClick={() => {
                    localStorage.clear();
                  }}
                >
                  <Typography textAlign="center">Logout</Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
