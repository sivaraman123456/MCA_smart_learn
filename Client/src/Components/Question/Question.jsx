import React ,{ useState }from 'react'
import { assets, url } from '../../assets/assests';
import { toast } from 'react-toastify';
import axios from 'axios';
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
    IconButton
  } from '@mui/material';
  import { PhotoCamera } from '@mui/icons-material';
const Question = () => {
    const [data, setData] = useState({
     subject: "",
        sem: "",
        
    });
    const Vite_url=import.meta.env.VITE_BASE_URL;

    const Vite_upload_question=import.meta.env.VITE_UPLOAD_QUESTION;

    const [image, setImage] = useState(false);
    const [file, setFile] = useState();
    const onSubmitHandler = async (event) => {
        event.preventDefault();
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
    }
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }
  return (
   
    <Container maxWidth="sm">
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
                <Typography variant="h4" align="center">Question Paper Upload</Typography>

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

      <TextField
        fullWidth
        label="Semester"
        name="sem"
        onChange={onChangeHandler}
        value={data.sem}
        placeholder="Type semester here"
        required
      />

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