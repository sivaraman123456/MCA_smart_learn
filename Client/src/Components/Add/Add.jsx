import React, { useState } from 'react';
import './Add.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Box,
  Container,
  IconButton,
  CircularProgress,
  Backdrop
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const Add = () => {
  const Vite_url = import.meta.env.VITE_BASE_URL;
  const Vite_file = import.meta.env.VITE_FILE_UPLOAD;
  console.log('add comp');
  const [data, setData] = useState({
    unit: "",
    subject: "",
    sem: "",
    category: ""
  });
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(false);
  const [file, setFile] = useState();
  
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("unit", data.unit);
      formData.append("subject", data.subject);
      formData.append("sem", data.sem);
      formData.append("category", data.category);
      formData.append("file", file);
      formData.append("image", image);
      console.log(data.unit, { image }, { file });
      const file_upload = `${Vite_url}${Vite_file}`;

      const response = await axios.post(file_upload, formData, {
        headers: { "Content-type": "multipart/form-data" }
      });
      if (response.status == 201) {
        toast.success(response.data.message);
        setData({
          unit: "",
          subject: "",
          sem: "",
          category: ""
        });
        setFile("");
        setImage(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  return (
    <Container maxWidth="sm">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter: 'blur(5px)' }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        component="form"
        onSubmit={onSubmitHandler}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          backgroundColor: '#fff',
          padding: 4,
          borderRadius: 2,
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
          mt: 4,
        }}
      >
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
  File Uploading
</Typography>

        <Typography variant="h6">Upload Image</Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton color="primary" component="label">
            <input hidden type="file" id="image" onChange={(e) => { setImage(e.target.files[0]); }} required />
            <PhotoCamera />
          </IconButton>
          {image && <img src={URL.createObjectURL(image)} alt="" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />}
        </Box>

        <Typography variant="h5">Upload File</Typography>
        {file && (
          <Typography variant="h6">{file.name}</Typography>
        )}
        <Button variant="contained" component="label">
          Upload PDF
          <input hidden type="file" onChange={(e) => setFile(e.target.files[0])} accept="application/pdf" required />
        </Button>

        <FormControl fullWidth>
          <InputLabel id="semester-label">Semester</InputLabel>
          <Select labelId="semester-label" name="sem" onChange={onChangeHandler} required>
            <MenuItem value="first">First sem</MenuItem>
            <MenuItem value="second">Second sem</MenuItem>
            <MenuItem value="third">Third sem</MenuItem>
            <MenuItem value="fourth">Final sem</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Subject"
          name="subject"
          onChange={onChangeHandler}
          value={data.subject}
          placeholder="Type subject here"
          required
        />

        <FormControl fullWidth>
          <InputLabel id="unit-label">Unit</InputLabel>
          <Select labelId="unit-label" name="unit" onChange={onChangeHandler} required>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="5">5</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="category-label">Subject Category</InputLabel>
          <Select labelId="category-label" name="category" onChange={onChangeHandler} required>
            <MenuItem value="DSA">DSA</MenuItem>
            <MenuItem value="JAVA">JAVA</MenuItem>
            <MenuItem value="OOPs">OOPs</MenuItem>
            <MenuItem value="DBMS">DBMS</MenuItem>
            <MenuItem value="CN">COMPUTER NETWORK</MenuItem>
            <MenuItem value="OS">OS</MenuItem>
            <MenuItem value="PYTHON">PYTHON</MenuItem>
            <MenuItem value="ST">ST</MenuItem>
            <MenuItem value="SE">SE</MenuItem>
            <MenuItem value="IWT">IWT</MenuItem>
            <MenuItem value="MCS">MCS</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary" fullWidth className='add-btn'>ADD</Button>
      </Box>
    </Container>
  );
}

export default Add;
