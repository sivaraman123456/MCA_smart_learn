import React, { useState } from 'react'
import './Add.css'
import { assets, url } from '../../assets/assests';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
    console.log('add comp');
    const [data, setData] = useState({
        unit:"",
        subject: "",
        sem: "first",
        category: "DSA"
    });

    const [image, setImage] = useState(false);
    const [file, setFile] = useState();
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("unit",data.unit);
        formData.append("subject", data.subject);
        formData.append("sem", data.sem);
        // formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("file",file);
        formData.append("image", image);
        console.log(data.unit,{image},{file});
        const response = await axios.post("http://localhost:5000/api/single", formData, {
            headers: { "Content-type": "multipart/form-data" }});
        if (response.status== 201) {
            toast.success(response.data.message)
            setData({
                unit:"",
                subject: "",
                sem: "",
                // price: "",
                category: "DSA"
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
                    <select name='sem' onChange={onChangeHandler} >
                            <option value="first">First sem</option>
                            <option value="second">Second sem</option>
                            <option value="third">Third sem</option>
                            <option value="fourth">Final sem</option>
                            
                        </select>
                </div>
                <div className='add-product-name flex-col'>
                    <p>Subject</p>
                    <input name='subject' onChange={onChangeHandler} value={data.subject} type="text" placeholder='Type subject here' required />
                </div>
                <div className='add-product-name flex-col'>
                    <p>Unit</p>
                    <select name='unit' onChange={onChangeHandler} >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>

                        </select>
                </div>
                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p>Subject category</p>
                        <select name='category' onChange={onChangeHandler} >
                            <option value="DSA">DSA</option>
                            <option value="JAVA">JAVA</option>
                            <option value="OOPs">OOPs</option>
                            <option value="DBMS">DBMS</option>
                            <option value="CN">COMPUTER NETWORK</option>
                            <option value="OS">OS</option>
                            <option value="PYTHON">PYTHON</option>
                            <option value="ST">ST</option>
                            <option value="SE">SE</option>
                            <option value="IWT">IWT</option>
                            <option value="MCS">MCS</option>
                        </select>
                    </div>
                
                </div>
                <button type='submit' className='add-btn' >ADD</button>
            </form>
        </div>
    )
}

export default Add


