
import User from "../models/user.model.js"

const all_users=async(req,res)=>{
    try {
         await User.find({})
                .then((data)=>{
            res.send({status:"ok",data:data})
            console.log(data);
        })

    } catch (error) {
        console.log(error);
        res.json({error:"data not found"})
    }
}
export default all_users;