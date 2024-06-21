import sgmail from "@sendgrid/mail"
import bcrypt from "bcrypt"
import {jwtGenerator} from "../utils/jwtgenerator.js" 
import { config } from "dotenv";
import User from "../models/user.model.js";

config();
const login=async(req,res)=>{
try {
        var API_KEY=process.env.MAIl_API;
        sgmail.setApiKey(API_KEY)
const {email,password}=req.body
const emailInfo={
    to:`${email}`,
    from:'sivaraman9344043151@gmail.com',
    subject:"Login ",
    html:`<h1 style="color:green; font-family:Arial, sans-serif;">Successfully Logged In!</h1>`
}
console.log("login");
sgmail.send(emailInfo)
.then((response)=>{console.log(response,"Email sent");
})
.catch(error=>{console.log(error,"Email not sent");
})
  
let existingUser = await User.findOne({ email  });
if( !existingUser)
    {
    
    return res.json({message:"password or email invalid"})
}

const validpass=bcrypt.compare(password,existingUser.password)
if (!validpass)
{
    return res.json({message:"password in valid"})
}

let userid=existingUser.id;
let token=jwtGenerator({id:userid});

res.send({token:token})
} 

catch (error) {
        console.error(error);
    }
}


export default login;