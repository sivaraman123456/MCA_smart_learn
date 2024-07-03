import React, { Fragment, useState, useEffect,createContext} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes  from 'prop-types';
import Cookies from 'js-cookie';
import {
  Navigate,
  createBrowserRouter,
  BrowserRouter as Router,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import Home from './pages/Home/Home';
import Login from './pages/Login/Login'
import Admin from './pages/Admin/Admin';
import Regitser from './pages/Register/Register';
import Add from './Components/Add/Add';
import List from './Components/List/List';
import Student from './Components/Student/Student';
import Notes from './Components/Notes/Notes';
import Question from './Components/Question/Question';
import ListQP from './Components/ListQP/ListQP';
import Question_paper_view from './Components/Question_paper_view/Question_paper_view';

export const RoleContext=createContext()
function App() {
  const Vite_url=import.meta.env.VITE_BASE_URL;
  const Vite_verify=import.meta.env.VITE_TOKEN_VERIFY;

const [role,setRole]=useState(()=>{
  const role=localStorage.getItem("user_role")

    if(role ==='admin')                                                     
      {
        return true
      }
      return false;
})
const [isAuthenticated,setIsAuthenticated]=useState(false);
const setAuth=(boolean)=>{
  setIsAuthenticated(boolean)
}
async function isAuth(){
  try{
    const tokenverify = `${Vite_url}${Vite_verify}`;

    const response=await fetch(tokenverify,{
      method:"GET",
      headers:{token:localStorage.token}
     
    })
    const parseRes=await response.json();
    console.log("Verifyj:",parseRes.message);

    parseRes.message === true ? setIsAuthenticated(true) : setIsAuthenticated(false)
  }
  catch(err){
console.log(err.message);
  }
}
useEffect(()=>{
  isAuth();
})
const router =createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:"/login",
    element: !isAuthenticated ? <Login setAuth={setAuth} /> : role ?<Navigate to ='/admin'/>:<Navigate to ='/notes'/>
  },
  {
    path:"/register",
    element: !isAuthenticated ? <Regitser setAuth={setAuth}/>:<Navigate to ='/login'/>
  },
  {
    path:"/notes",
    element: isAuthenticated ? <Notes setAuth={setAuth}/>:<Navigate to='/login'/>
  },
  {
    path:"/admin",
    element: isAuthenticated ? <Admin setAuth={setAuth}/>:<Navigate to='/login'/>,
    children: [{
      path:'/admin/add',
      element:<Add/> 
    },
  {
    path:"/admin/list",
    element:<List/>
  },
  {
    path:"/admin/student",
    element:<Student/>
  },
  {
    path:"/admin/question_paper",
    element:<Question/>
  },
  {
    path:"/admin/list_question_paper",
    element:<ListQP/>
  }
]
  },
  {
    path:"/notes/question_paper",
    element:<Question_paper_view/>
  }
])
  return (
   <Fragment>
    <RoleContext.Provider value={setRole}>
      <RouterProvider router={router}/>
    </RoleContext.Provider>
   </Fragment>
  )
}

export default App
