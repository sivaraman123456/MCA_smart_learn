import React, { useState, useEffect } from 'react';
import './Notes.css';
import { menu_list } from '../../assets/assests';
import { ToastContainer, toast } from 'react-toastify';
import { FaRegEye } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import {
 CircularProgress
} from '@mui/material';
import PageHeading from "../PageHeading";
import { useNavigate } from "react-router-dom";

const Notes = ({ setAuth }) => {
  const [category, setCategory] = useState("All");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  const [allImage, setAllImage] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true); // state for loading
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const Vite_url = import.meta.env.VITE_BASE_URL;

  const Vite_get_file=import.meta.env.VITE_GET_FILE;
  const Vite_get_user=import.meta.env.VITE_GET_USER;
  const Vite_show_pdf=import.meta.env.VITE_SHOW_PDF;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
};
  const getFile = async () => {
    try {
      const get_file=  `${Vite_url}${Vite_get_file}`;

      const result = await fetch(get_file, { method: "GET" });
      const data = await result.json();
      if (data.status == "ok") {
        if (Array.isArray(data.data)) {
          setAllImage(data.data);
        } else {
          console.error("Data fetched is not an array:", data);
        }
        console.log("allImage:", data.data);
      } else {
        console.error("Wrong response server error");
      }
    } catch (err) {
      console.error("Error fetching files:", err);
    } finally {
      setLoading(false); // set loading to false after fetching data
    }
  };

  const getName = async () => {
    try {
     console.log();
     let emailID=localStorage.getItem("user_email")
     const get_user=  `${Vite_url}${Vite_get_user}${emailID}`;

      const response = await fetch(get_user, {
        method: "POST",
        headers: { token: localStorage.token },
  });
      const parseRes = await response.json();
      console.log("name:",parseRes);
      setName(parseRes.name);
      setEmail(parseRes.email);
      setAvatar(parseRes.avatar)
      console.log(parseRes);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  const showPdf = (pdf) => {
    const show_pdf=  `${Vite_url}${Vite_show_pdf}${pdf}`;

    window.open(show_pdf, "_blank", "noreferrer");
  };

  const navigateToQuestion =()=>{
    navigate("/notes/question_paper")
}
const destroySession=()=>{
  toast.success("Logout Successfully.......");
    localStorage.removeItem("token");
    localStorage.removeItem("user_role");
    navigate("/")
  }
  const menuItems = [
    { label: 'Question_paper', onClick: navigateToQuestion},
    { label: 'Logout', onClick: destroySession }
];
const handleClose = () => {
  setAnchorEl(null);}
  

  useEffect(() => {
    getFile();
    getName();
  }, []);

  useEffect(() => {
    const filteredImages = allImage.filter(data => {
      return (category === "All" || data.category === category) &&
        (data.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.sem.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.unit.toLowerCase().includes(searchTerm.toLowerCase()));
    });
    console.log("filter:", filteredImages);
    setFilteredData(filteredImages);
  }, [searchTerm, allImage, category]);

  return (
    <div className="app">
 <PageHeading anchorEl={anchorEl} handleMenu={handleMenu} handleClose={handleClose} menuItems={menuItems} />
 <div className="dash" style={{ color: 'black' }}>
 <img src={avatar} alt="avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />

        <h4> {name}</h4>
        <h4> {email}</h4>
 </div>
      <div className='explore-menu' id='explore-menu'>
        <h1>Explore Our Notes</h1>
        <div className="explore-menu-text"><p>Access your course notes anytime and enhance your learning experience with our comprehensive Learning Management System.</p></div>
        <div className="search-bar">
        <input
          type="text"
          placeholder="Search by subject, semester or unit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
        <div className="explore-menu-list">
          {menu_list.map((item, index) => (
            <div key={index} onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} className='explore-menu-list-item'>
              <img src={item.menu_image} className={category === item.menu_name ? "active" : ""} alt={item.menu_name} />
              <p>{item.menu_name}</p>
            </div>
          ))}
        </div>
        <hr />
      </div>
 
     
       <div className="uploaded">
      {loading ? (
        <CircularProgress /> // show loading spinner while fetching data
      ) : (
        <div className="grid-container">
          {filteredData.map((data, index) => (
            <div key={index} className="inner-div">
              <div className="card" style={{ width: "19rem" }}>
                <img src={`${Vite_url}${Vite_show_pdf}${data.image}`} className="card-img-top" alt={data.subject} />
                <div className="card-body">
                  <h5 className="card-title">Subject: {data.subject}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Semester: {data.sem}</h6>
                  <p className="card-text">Unit: {data.unit}</p>
                  <FaRegEye onClick={() => showPdf(data.pdf)} style={{ marginLeft: "20px", cursor: "pointer" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
      <ToastContainer />
    </div>
  );
}

export default Notes;
