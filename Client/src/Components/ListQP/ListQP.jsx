import React, { useEffect, useState } from 'react';
import {
  TableContainer, Table, TableHead, TableRow,
  TableCell, TableBody, Paper
} from '@mui/material';
import axios from 'axios';
import { url } from '../../assets/assests';
import { format } from 'date-fns';

import { RiDeleteBinFill } from "react-icons/ri";
import { toast } from 'react-toastify';
const ListQP = () => {
  const [list, setList] = useState([]);
  const Vite_url=import.meta.env.VITE_BASE_URL;
  const Vite_get_questions=import.meta.env.VITE_GET_QUESTIONS;
  const Vite_delete_question=import.meta.env.VITE_DELETE_QUESTION;
  const Vite_show_question__pdf=import.meta.env.VITE_SHOW_QUESTION_PDF;

  const fetchList = async () => {
    try {
      const get_questions=  `${Vite_url}${Vite_get_questions}`;

      const result = await fetch(get_questions, { method: 'GET' });
      const data = await result.json();
      console.log("datass:",data);
      // Ensure data is an array before setting the state
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
  const removedata = async (dataId) => {
    try {
      console.log("Id:",dataId);
      const delete_file=  `${Vite_url}${Vite_delete_question}${dataId}`;

      console.log("Id:",dataId);
      const send = await axios.delete(delete_file);
      if (send.data.status === 'ok') {
        toast.success('Question paper deleted successfully.');
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
  const showPdf = (pdf) => {
    const show_pdf=  `${Vite_url}${Vite_show_question__pdf}${pdf}`;

    window.open(show_pdf, "_blank", "noreferrer");
  };
  return (
    <>
    <TableContainer component={Paper} sx={{ marginTop: '20px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: '#fff', color: 'inherit' }}>
        <Table>
            <TableHead sx={{ backgroundColor: '#e0e0e0' }}>
                <TableRow>
                    <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'inherit' }}>S.No</TableCell>
                    <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'inherit' }}>Image</TableCell>

                    <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'inherit' }}>Semester</TableCell>
                    <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'inherit' }}>Subject</TableCell>
                    <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'inherit' }}>Question Paper</TableCell>
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
                                <TableCell sx={{  color: 'inherit' }}><img style={{width:"50px"}}src={`${Vite_url}${Vite_show_question__pdf}${item.image}`}  alt="" /></TableCell>

                                <TableCell sx={{ fontSize: '1.2rem', color: 'inherit' }}>{item.sem}</TableCell>
                                <TableCell sx={{ fontSize: '1.2rem', color: 'inherit' }}>{item.subject}</TableCell>
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
<TableCell sx={{ fontSize: '1.2rem', color: 'inherit' }}>
                        {format(new Date(item.createdAt), 'MMMM dd, yyyy hh:mm:ss a')}
                      </TableCell>
                                <TableCell onClick={()=>{removedata(item._id)}} sx={{
    fontSize: '1.2rem',
    color: 'inherit',
    width: '20px',
    '&:hover': {
      color: 'red',
    }}}><RiDeleteBinFill /></TableCell>

                            </TableRow>
                        
                    </React.Fragment>
                ))
              ):(
                <p>No Question Paper Available</p>
              )}
            </TableBody>
        </Table>
    </TableContainer>
</>
  )
}

export default ListQP