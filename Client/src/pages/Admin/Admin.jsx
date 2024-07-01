import React from 'react'
import {  Outlet } from 'react-router-dom'
import './Admin.css'
import Sidebar from '../../Components/Slidebar/Sidebar'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const Admin = ({setAuth}) => {
  const navigate = useNavigate();
    const Logout=(e)=>{
        e.preventDefault();
        setAuth(false)
        toast.success("Logout Successfully.......")
        localStorage.removeItem("token")
        localStorage.removeItem("user_role")
        navigate("/")
      }
  return (
    <div className='app'>
         <div className="logout">
      <button className="btn btn-danger btn-block " style={{alignItems:"flex-end"}} onClick={(e)=>Logout(e)}><BiLogOut/></button>
      </div>
    <ToastContainer/>
    <hr />
    <div className="app-content">
    
    <div className="sidebar"><Sidebar/></div>  
      <div className="view-content"><Outlet /></div>
    </div>
  </div>   
  )
}
export default Admin


// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import './Admin.css';
// import Sidebar from '../../Components/Slidebar/Sidebar';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Admin = ({ setAuth }) => {
//   const Logout = (e) => {
//     e.preventDefault();
//     setAuth(false);
//     toast.success("Logout Successfully.......");
//     localStorage.removeItem("token");
//     localStorage.removeItem("user_role");
//   };

//   return (
//     <div className='app'>
//       <div className="logout">
//         <button 
//           className="btn btn-warning btn-block" 
//           style={{ alignItems: "flex-end" }} 
//           onClick={(e) => Logout(e)}
//         >
//           Logout
//         </button>
//       </div>
//       <ToastContainer />
//       <hr />
//       <div className="app-content">
//         <div className="sidebar">
//           <Sidebar />
//         </div>
//         <div className="view-content">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Admin;
