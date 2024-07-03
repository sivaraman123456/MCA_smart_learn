

import React from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const PageHeading = ({ handleMenu, handleClose, menuItems, anchorEl }) => {
  return (
    <>
      <div className="menu">
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="menu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          sx={{ fontSize: '2.5rem' }} // Increase the font size here
        >
          <MenuIcon fontSize="inherit" />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              onClick={item.onClick}
              sx={{ color: 'black', '&:hover': { bgcolor: 'e0e0e0' } ,fontSize:"1.5rem"}}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </>
  );
};

export default PageHeading;
