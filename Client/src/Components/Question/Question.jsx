import React ,{ useState }from 'react'
import { assets, url } from '../../assets/assests';
import { toast } from 'react-toastify';
import axios from 'axios';

const Question = () => {
    const [data, setData] = useState({
     subject: "",
        sem: "",
        
    });
    const [image, setImage] = useState(false);
    const [file, setFile] = useState();
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("subject", data.subject);
        formData.append("sem", data.sem);
        formData.append("file",file);
        formData.append("image", image);
        const response = await axios.post("http://localhost:5000/api/question_upload", formData, {
           
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
    <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex-col'>
                    <p>Upload image</p>
                    <label htmlFor="image">
                        <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
                    </label>
                    <input onChange={(e) => { setImage(e.target.files[0]) }} type="file" id="image" hidden required />
                </div>
                <div className='add-product-description flex-col'>
                <p>Upload File</p>
                <input type='file'
              onChange={(e) => setFile(e.target.files[0])}
              className='form-control my-4  md-4'
              required
              accept='application/pdf' />
              </div>
              <div className='add-product-name flex-col'>
                    <p>Semester</p>
                    <input name='sem' onChange={onChangeHandler} value={data.sem} type="text" placeholder='Type subject here' required />
                </div>
                <div className='add-product-name flex-col'>
                    <p>Subject</p>
                    <input name='subject' onChange={onChangeHandler} value={data.subject} type="text" placeholder='Type subject here' required />
                </div>
               
                
                <button type='submit' className='add-btn' >ADD</button>
            </form>
        </div>
  )
}

export default Question