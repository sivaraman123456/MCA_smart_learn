import React ,{ useState }from 'react'
import { assets, url } from '../../assets/assests';
import { toast } from 'react-toastify';
import axios from 'axios';
import {
    Button,
    TextField,
    Typography,
    Box,
    Container,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    Backdrop
  } from '@mui/material';
  import { PhotoCamera } from '@mui/icons-material';
const Question = () => {
    const [data, setData] = useState({
     subject: "",
        sem: "",
        
    });
    const Vite_url=import.meta.env.VITE_BASE_URL;

    const Vite_upload_question=import.meta.env.VITE_UPLOAD_QUESTION;
    const [loading, setLoading] = useState(false);

    const [image, setImage] = useState(false);
    const [file, setFile] = useState();
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
try {
  const formData = new FormData();
        formData.append("subject", data.subject);
        formData.append("sem", data.sem);
        formData.append("file",file);
        formData.append("image", image);
        const question_upload=  `${Vite_url}${Vite_upload_question}`;

        const response = await axios.post(question_upload, formData, {
           
            headers: { "Content-type": "multipart/form-data" }});
            console.log("response:",response);
            console.log("status:",response.status);
        if (response.status == 201) {
            toast.success(response.data.message)
            setData({
               subject: "",
                sem: "",
                })
            setFile("");
            setImage(false);
        }
        else {
            toast.error(response.data.message)
        }
} catch (error) {
  toast.error(error.message);

}
finally {
  setLoading(false);
}
        
    }
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }
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
        gap: 3,
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
  Question Papaer Uploading
</Typography>
      <Typography variant="h6" gutterBottom>
        Upload Image
      </Typography>
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton color="primary" component="label">
          <input
            hidden
            type="file"
            id="image"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setImageState(e.target.files[0]);
            }}
            required
          />
          <PhotoCamera />
        </IconButton>
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt=""
            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
          />
        )}
      </Box>

      <Typography variant="h6" gutterBottom>
        Upload File
      </Typography>
      {file && (
        <Typography variant="h6">{file.name}</Typography>
      )}
      <Button variant="contained" component="label">
        Upload PDF
        <input
          hidden
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept="application/pdf"
          required
        />
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

      <Button type="submit" variant="contained" color="primary" fullWidth>
        ADD
      </Button>
    </Box>
  </Container>
  )
}

export default Question