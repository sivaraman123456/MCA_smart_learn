import React, { useEffect, useState } from 'react';
import {
  TableContainer, Table, TableHead, TableRow,
  TableCell, TableBody, Paper, CircularProgress, Typography, Box
} from '@mui/material';
import axios from 'axios';
import { url } from '../../assets/assests';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { RiDeleteBinFill } from "react-icons/ri";

const Student = () => {
  const Vite_url = import.meta.env.VITE_BASE_URL;
  const Vite_all_student = import.meta.env.VITE_ALL_STUDENTS;
  const Vite_delete_student = import.meta.env.VITE_DELETE_STUDENT;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 

  const fetchData = async () => {
    try {
      const all_student = `${Vite_url}${Vite_all_student}`;
      const response = await fetch(all_student, { method: "GET" });
      const data = await response.json();
      console.log(data);
      if (Array.isArray(data.data)) {
        setData(data.data);
      } else {
        setData([]);
        console.error('Expected an array but got:', data);
      }
    } catch (error) {
      console.error("Error fetching the list:", error);
      setData([]);
    } finally {
      setLoading(false); 
    }
  };

  const removeData = async (id) => {
    console.log("id:", id);
    const del_student = `${Vite_url}${Vite_delete_student}${id}`;
    try {
      const remove = await axios.delete(del_student);
      if (remove.status === 200) {
        toast.success('Student deleted successfully.');
        fetchData();
      } else {
        toast.error('Error deleting student');
      }
    } catch (error) {
      toast.error('Error deleting student');
      console.error("Error deleting student:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
     

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ marginTop: '20px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: '#fff', color: 'inherit' }}>
         <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
         <Typography
  variant="h4"
  align="center"
  sx={{
    fontWeight: 'bold',
    fontSize: '3rem',
    fontFamily: 'Times New Roman',
    color: '#6B46C1',
    background: 'linear-gradient(to right, #6B46C1, #B794F4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    
    padding: '10px',
    animation: 'fadeIn 3s ease-in-out',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
    letterSpacing: '1px'
  }}
>
  Student Record List
</Typography>
      </Box>
          <Table>
            <TableHead sx={{ backgroundColor: '#e0e0e0' }}>
              <TableRow>
                <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'inherit' }}>S.No</TableCell>
                <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'inherit' }}>Avatar</TableCell>
                <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'inherit' }}>Name</TableCell>
                <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'inherit' }}>Email</TableCell>
                <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'inherit' }}>CreatedAt</TableCell>
                <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'inherit' }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  item.name !== 'Admin' ? (
                    <TableRow key={index} style={{ cursor: 'pointer' }}>
                      <TableCell sx={{ fontSize: '1.2rem', color: 'inherit' }}>{index + 1}</TableCell>
                      <TableCell sx={{ fontSize: '1.2rem', color: 'inherit' }}>
                        <img src={item.avatar} alt="avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                      </TableCell>
                      <TableCell sx={{ fontSize: '1.2rem', color: 'inherit' }}>{item.name}</TableCell>
                      <TableCell sx={{ fontSize: '1.2rem', color: 'inherit' }}>{item.email}</TableCell>
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
                  ) : null
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} sx={{ textAlign: 'center', fontSize: '1.2rem', color: 'inherit' }}>
                    No Student Data Available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Student;
