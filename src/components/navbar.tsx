import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
let activeStyle = {
  textDecoration: 'none',
  color: 'white',
};
export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <NavLink style={({ isActive }) => activeStyle} to={`create`}>
              {' '}
              Create Customer
            </NavLink>
          </Typography>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <NavLink style={({ isActive }) => activeStyle} to={`customers`}>
              {' '}
              Customers
            </NavLink>
          </Typography>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <NavLink style={({ isActive }) => activeStyle} to={`buses`}>
              {' '}
              Buses
            </NavLink>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
