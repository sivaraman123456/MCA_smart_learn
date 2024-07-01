import Question from "../models/question.model.js";
const get_question=async(req,res)=>{
    try {
     
    await Question.find({})
 .then((data)=>{
        res.send({status:"ok",data:data})
        console.log("file:",data);
      })  
     
    } catch (err) {
        console.error(err.message);
      
    }
    
}
export default get_question;