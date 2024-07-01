import File from "../models/file.model.js";

const get_file=async(req,res)=>{
    try {
     
    await File.find({})
 .then((data)=>{
        res.send({status:"ok",data:data})
        console.log("file:",data);
      })  
     
    } catch (err) {
        console.error(err.message);
      
    }
    
}
export default get_file;