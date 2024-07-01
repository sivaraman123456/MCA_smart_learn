import React, { useEffect, useState } from 'react';
import './List.css';
import { url } from '../../assets/assests';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  TableContainer, Table, TableHead, TableRow,
  TableCell, TableBody, Paper

} from '@mui/material';
import { format } from 'date-fns';

import { RiDeleteBinFill } from "react-icons/ri";
const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const result = await fetch('http://localhost:5000/api/get_file', { method: 'GET' });
      const data = await result.json();
      console.log("datass:",data);
      if (Array.isArray(data.data)) {
        setList(data.data);
      } else {
        setList([]);
        console.error('Expected an array but got:', data);
      }
    } catch (error) {
      console.error("Error fetching the list:", error);
      setList([]); // Set an empty array if there's an error
    }
  };
  const showPdf = (pdf) => {
    window.open(`http://localhost:5000/files/${pdf}`, "_blank", "noreferrer");
  };
  const removedata = async (dataId) => {
    try {
      const send = await axios.delete(`http://localhost:5000/api/delete_file/${dataId}`);
      if (send.data.status === 'ok') {
        toast.success('File deleted successfully.');
        await fetchList();
      } else {
        toast.error('Error deleting file');
      }
    } catch (error) {
      toast.error('Error deleting file');
      console.error("Error deleting file:", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
   
  <TableContainer component={Paper} sx={{ marginTop: '20px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: '#fff', color: 'inherit' }}>
        <Table>
            <TableHead sx={{ backgroundColor: '#e0e0e0' }}>
                <TableRow>
                    <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'inherit' }}>S.No</TableCell>
                    <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'inherit' }}>Image</TableCell>
                    <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'inherit' }}>Pdf</TableCell>
                    <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'inherit' }}>Semester</TableCell>
                    <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'inherit' }}>Subject</TableCell>
                    <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'inherit' }}>Unit</TableCell>
                    <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'inherit' }}>CreatedAt</TableCell>
                    <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'inherit' }}>Delete</TableCell>
                    </TableRow>
            </TableHead>
            <TableBody>
                {list.length > 0 ?(
                list.map((item,index) => (
                    <React.Fragment key={index}>
                       <TableRow  style={{ cursor: 'pointer' }}>
                                <TableCell sx={{ fontSize: '1.2rem', color: 'inherit' }}>{index+1}</TableCell>
                                <TableCell sx={{  color: 'inherit' }}><img style={{width:"50px"}}src={`${url}/files/${item.image}`}  alt="" /></TableCell>
                             
<TableCell
  sx={{
    fontSize: '1.2rem',
    color: 'inherit',
    textDecoration: 'underline',
    textDecorationColor: 'blue',
    '&:hover': {
      textDecorationColor: 'red',
    },
  }}
  onClick={() => showPdf(item.pdf)}
>
  {item.pdf}
</TableCell>
                                <TableCell sx={{ fontSize: '1.2rem', color: 'inherit' }}>{item.sem}</TableCell>
                                <TableCell sx={{ fontSize: '1.2rem', color: 'inherit' }}>{item.subject}</TableCell>

                                <TableCell sx={{ fontSize: '1.2rem', color: 'inherit' }}>{item.unit}</TableCell>
                                <TableCell sx={{ fontSize: '1.2rem', color: 'inherit' }}>
                        {format(new Date(item.createdAt), 'MMMM dd, yyyy hh:mm:ss a')}
                      </TableCell>
                                <TableCell onClick={()=>{removedata(item._id)}} sx={{
    fontSize: '1.2rem',
    color: 'inherit',
    width: '20px',
    '&:hover': {
      color: 'red',
    }}}><RiDeleteBinFill /></TableCell>                                </TableRow>
                        </React.Fragment>
                ))
              ):(
                <p>No Question Paper Available</p>
              )}
            </TableBody>
        </Table>
    </TableContainer>


  );
};

export default List;


