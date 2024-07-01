import React from 'react'
import {
    AppBar, Toolbar, Typography, IconButton,
    Menu, MenuItem, Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
const PageHeading = ({ handleMenu, handleClose, menuItems, anchorEl }) => {
  return (
//     <AppBar position='static' sx={{ bgcolor: '#f5f5f5' }}>
//     <Toolbar sx={{ bgcolor: '#f5f5f5' }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
           
//             <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                 <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Orbitron', fontSize: '1.5rem', fontWeight: 'bold', color: '#1f1e33' }}>
//                     TALENTSHIP
//                 </Typography>
//             </Box>
//         </Box>
//         <Box sx={{ flexGrow: 1 }} />
       
//     </Toolbar>
// </AppBar>
<>
<div className="menu">
<IconButton size='medium' edge='end' color='black' aria-label='label' aria-controls='menu-appbar' aria-haspopup='true' onClick={handleMenu}>
<MenuIcon />
</IconButton>
<Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={Boolean(anchorEl)} onClose={handleClose}>
{menuItems.map((item, index) => (
    <MenuItem key={index} onClick={item.onClick} sx={{ color: 'black', '&:hover': { bgcolor: 'e0e0e0' } }}>
        {item.label}
    </MenuItem>
))}
</Menu>
</div>
</>
  )
}

export default PageHeading