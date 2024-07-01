import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FaRegEye } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import {
 CircularProgress
} from '@mui/material';
import "./Question_paper_view.css"
import PageHeading from "../PageHeading";
import { useNavigate } from "react-router-dom";

const Question_paper_view = () => {
    const [allImage, setAllImage] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true); // state for loading
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
  
    const getFile = async () => {
        try {
          const result = await fetch("http://localhost:5000/api/get_question", { method: "GET" });
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
      const showPdf = (pdf) => {
        window.open(`http://localhost:5000/questions/${pdf}`, "_blank", "noreferrer");
      };
      const navigateToQuestion =()=>{
        navigate("/notes")
    }
    const destroySession=()=>{
        toast.success("Logout Successfully.......");
          localStorage.removeItem("token");
          localStorage.removeItem("user_role");
          navigate("/")
        }
        const menuItems = [
            { label: 'Subject Notes', onClick: navigateToQuestion},
            { label: 'Logout', onClick: destroySession }
        ];
        const handleClose = () => {
            setAnchorEl(null);}

            useEffect(() => {
                getFile();
                
              }, []);
              useEffect(() => {
                const filteredImages = allImage.filter(data => {
                  return (data.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      data.sem.toLowerCase().includes(searchTerm.toLowerCase()) 
                    );
                });
                console.log("filter:", filteredImages);
                setFilteredData(filteredImages);
              }, [searchTerm, allImage]);
    return (
        <div className="app">
        <PageHeading anchorEl={anchorEl} handleMenu={handleMenu} handleClose={handleClose} menuItems={menuItems} />
        <div className="explore"><h1>Explore Our Semester wise Question paper</h1></div>
        <div className="explore-menu-text"><p>Access your course notes anytime and enhance your learning experience with our comprehensive Learning Management System.</p></div>
             <div className="search-bar">
               <input
                 type="text"
                 placeholder="Search by subject, semester or unit..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
             </div>
              <div className="uploaded">
      {loading ? (
        <CircularProgress /> 
      ) : (
        <div className="grid-container">
          {filteredData.map((data, index) => (
            <div key={index} className="inner-div">
              <div className="card" style={{ width: "19rem" }}>
                <img src={`http://localhost:5000/questions/${data.image}`} className="card-img-top" alt={data.subject} />
                <div className="card-body">
                  <h5 className="card-title">Subject: {data.subject}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Semester: {data.sem}</h6>
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
  )
}

export default Question_paper_view