import {config} from "dotenv";
import sgmail from "@sendgrid/mail"
import bcrypt from "bcrypt"
import {jwtGenerator} from "../utils/jwtgenerator.js" 
import User from "../models/user.model.js";
config()
const register=async(req,res)=>{
    try {
        var API_KEY=process.env.MAIl_API;
        sgmail.setApiKey(API_KEY)     
const {name,email,password,role}=req.body;
const  emailInfo={
    to:`${email}`,
    from:'sivaraman9344043151@gmail.com',
    subject:"Register ",
    html:`<h1 style="color:blue; font-family:Arial, sans-serif;">${name} Successfully Registered In!</h1>`
}
sgmail.send(emailInfo)
.then((response)=>{console.log(response,"Email sent");
})
.catch(error=>{console.log(error,"Email not sent");
})

let existingUser = await User.findOne({email})
if( existingUser)
    {
       return  res.json({success:false,message:"user already exists.."})
    }
const saltRound=10;
const salt= await bcrypt.genSalt(saltRound)
const bcryptpass= await bcrypt.hash(password,salt);

const user1=new User({
name:name,
email:email,
password:bcryptpass,
role:"user"
});

await user1.save()

let userid=user1.id;
console.log("userid:",userid);
let token=jwtGenerator({id:userid});
 res.status(201).json({token:token})
   
} catch (error) {
        console.error(error);
        res.json("error .....")
}
}
export default register;