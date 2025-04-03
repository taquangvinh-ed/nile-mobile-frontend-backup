import React from 'react';
import { Box, IconButton, InputBase } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = ({ setIsSidebarHidden, isSidebarHidden }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: 'RGBA(33,37,41,0.8)',
        padding: '8px 16px',
        borderRadius: '20px',
      }}
    >
      {/* Menu Icon */}
      <IconButton
        sx={{ color: 'white' }}
        onClick={() => setIsSidebarHidden(!isSidebarHidden)}
      >
        <MenuIcon />
      </IconButton>

      {/* Search Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid gray',
          borderRadius: '24px',
          padding: '8px 16px',
          width: '80%',
        }}
      >
        <SearchIcon sx={{ color: 'white', marginRight: '8px' }} />
        <InputBase
          placeholder="Search"
          sx={{
            color: 'white',
            width: '100%',
          }}
        />
      </Box>

      {/* Account Section */}
      <IconButton sx={{ color: 'white' }}>
        <AccountCircleIcon />
      </IconButton>
    </Box>
  );
};

export default Header;