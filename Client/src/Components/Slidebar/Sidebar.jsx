

import React, { useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assests';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <Link 
          to='/admin/add' 
          className={`sidebar-option ${activeLink === '/admin/add' ? 'active' : ''}`} 
          onClick={() => handleLinkClick('/admin/add')}
        >
          <img src={assets.add_icon} alt="" />
          <p>Upload Notes</p>
        </Link>
        <Link 
          to='/admin/list' 
          className={`sidebar-option ${activeLink === '/admin/list' ? 'active' : ''}`} 
          onClick={() => handleLinkClick('/admin/list')}
        >
          <img src={assets.order_icon} alt="" />
          <p>List Notes</p>
        </Link>
        <Link 
          to='/admin/student' 
          className={`sidebar-option ${activeLink === '/admin/student' ? 'active' : ''}`} 
          onClick={() => handleLinkClick('/admin/student')}
        >
          <img src={assets.order_icon} alt="" />
          <p>Student List</p>
        </Link>
        <Link 
          to='/admin/question_paper' 
          className={`sidebar-option ${activeLink === '/admin/question_paper' ? 'active' : ''}`} 
          onClick={() => handleLinkClick('/admin/question_paper')}
        >
          <img src={assets.order_icon} alt="" />
          <p>Question Paper</p>
        </Link>
        <Link 
          to='/admin/list_question_paper' 
          className={`sidebar-option ${activeLink === '/admin/list_question_paper' ? 'active' : ''}`} 
          onClick={() => handleLinkClick('/admin/list_question_paper')}
        >
          <img src={assets.order_icon} alt="" />
          <p>Question Paper Lists</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
