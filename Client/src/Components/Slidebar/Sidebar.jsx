import React, { useState } from 'react';
import './Sidebar.css';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

const toggleMenu = () => {
  setIsMenuOpen(!isMenuOpen);
};
 const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    

<AppBar position="static">
<Toolbar>
  <Typography variant="h6" style={{ flexGrow: 1 }}>
    Admin Panel
  </Typography>
  <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleMenu}>
    <MenuIcon />
  </IconButton>
</Toolbar>
<Drawer anchor="left" open={isMenuOpen} onClose={toggleMenu}>
  <List>
    <ListItem 
      button 
      component={Link} 
      to='/admin/add' 
      selected={activeLink === '/admin/add'}
      onClick={() => handleLinkClick('/admin/add')}
    >
      <ListItemIcon><AddIcon /></ListItemIcon>
      <ListItemText primary="Upload Notes" />
    </ListItem>
    <ListItem 
      button 
      component={Link} 
      to='/admin/list' 
      selected={activeLink === '/admin/list'}
      onClick={() => handleLinkClick('/admin/list')}
    >
      <ListItemIcon><ListIcon /></ListItemIcon>
      <ListItemText primary="List Notes" />
    </ListItem>
    <ListItem 
      button 
      component={Link} 
      to='/admin/student' 
      selected={activeLink === '/admin/student'}
      onClick={() => handleLinkClick('/admin/student')}
    >
      <ListItemIcon><PeopleIcon /></ListItemIcon>
      <ListItemText primary="Student List" />
    </ListItem>
    <ListItem 
      button 
      component={Link} 
      to='/admin/question_paper' 
      selected={activeLink === '/admin/question_paper'}
      onClick={() => handleLinkClick('/admin/question_paper')}
    >
      <ListItemIcon><DescriptionIcon /></ListItemIcon>
      <ListItemText primary="Question Paper" />
    </ListItem>
    <ListItem 
      button 
      component={Link} 
      to='/admin/list_question_paper' 
      selected={activeLink === '/admin/list_question_paper'}
      onClick={() => handleLinkClick('/admin/list_question_paper')}
    >
      <ListItemIcon><DescriptionIcon /></ListItemIcon>
      <ListItemText primary="Question Paper Lists" />
    </ListItem>
  </List>
</Drawer>
</AppBar>

  );
};

export default Sidebar;
