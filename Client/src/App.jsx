import React, { Fragment, useState, useEffect,createContext} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {
  Navigate,
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import './App.css'
import Home from './pages/Home/Home';
import Login from './pages/Login/Login'


function App() {

  return (
    <>
     {/* <Home />  */}
    <Login />
    </>
  )
}

export default App
