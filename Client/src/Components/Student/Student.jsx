import React from 'react'
import { url } from '../../assets/assests'
import axios from 'axios'
import "./Student.css"
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import {
  TableContainer, Table, TableHead, TableRow,
  TableCell, TableBody, Paper
} from '@mui/material';
import { useState ,useEffect} from 'react'
import { RiDeleteBinFill } from "react-icons/ri";
const Student = () => {
  const Vite_url=import.meta.env.VITE_BASE_URL;
  const Vite_all_student=import.meta.env.VITE_ALL_STUDENTS;
  const Vite_delete_student=import.meta.env.VITE_DELETE_STUDENT;


    const [data,setData]=useState([])
const fetchData=async()=>{
  const all_student=  `${Vite_url}${Vite_all_student}`;

const response=await fetch(all_student,{method:"GET"})
const data = await response.json();
console.log(data);
if (Array.isArray(data.data)) {
  setData(data.data)
  console.log("student:",data.data);
} else {
  setData([]);
  console.error('Expected an array but got:', data);
}

}

const removeData=async(id)=>{
  console.log("id:",id);
  const del_student=  `${Vite_url}${Vite_delete_student}${id}`;
const remove=await axios.delete(del_student)
console.log(remove);
  if(remove.status== 200)
  {
    toast.success(remove.message)
    fetchData();
  }
  else{
    toast.error(remove.error)
  }
}
useEffect(()=>{
fetchData();
},[])
 return (

   <>
   <div className="list">
   <p>All Student List</p>
   </div>
  
   <Paper className='list add flex-col' sx={{ width: '100%', overflowX: 'auto' }}>
      <TableContainer component={Paper} sx={{ marginTop: '20px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: '#fff', color: 'inherit', width: '90%', margin: 'auto' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#e0e0e0' }}>
            <TableRow>
              <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'inherit' }}>S.No</TableCell>
              <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'inherit' }}>Avatar</TableCell>
              <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'inherit' }}>Name</TableCell>
              <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'inherit' }}>Email</TableCell>
              {/* <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'inherit' }}>Password</TableCell> */}
              <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'inherit' }}>CreatedAt</TableCell>
              <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'inherit' }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((item, index) => (
                item.name !== 'Admin' ? (
                  <React.Fragment key={index}>
                    <TableRow style={{ cursor: 'pointer' }}>
                      <TableCell sx={{ fontSize: '1.2rem', color: 'inherit' }}>{index + 1}</TableCell>
                      <TableCell sx={{ fontSize: '1.2rem', color: 'inherit' }}>
                        <img src={item.avatar} alt="avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                      </TableCell>
                      <TableCell sx={{ fontSize: '1.2rem', color: 'inherit' }}>{item.name}</TableCell>
                      <TableCell sx={{ fontSize: '1.2rem', color: 'inherit' }}>{item.email}</TableCell>
                      {/* <TableCell sx={{ fontSize: '1.2rem', color: 'inherit' }}>{item.password}</TableCell> */}
                      <TableCell sx={{ fontSize: '1.2rem', color: 'inherit' }}>
                        {format(new Date(item.createdAt), 'MMMM dd, yyyy hh:mm:ss a')}
                      </TableCell>
                      <TableCell
                        onClick={() => { removeData(item._id); }}
                        sx={{
                          fontSize: '1.2rem',
                          color: 'inherit',
                          width: '20px',
                          '&:hover': {
                            color: 'red',
                          },
                        }}
                      >
                        <RiDeleteBinFill />
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ) : null
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} sx={{ textAlign: 'center', fontSize: '1.2rem', color: 'inherit' }}>
                  No Student Data Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  </>
    );
  };
  
    
  


export default Student

