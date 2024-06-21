import mongoose from "mongoose";

export const  connectDB = async () =>{
    await mongoose.connect('mongodb+srv://sivaraman9344043151:ejCXY0KmM4n4VNPf@cluster0.elajh37.mongodb.net/LMS').then(()=>console.log("DB Connected"))
}

