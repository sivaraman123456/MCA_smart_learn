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

  
let existingUser = await User.findOne({ email  });
if( !existingUser)
    {
    
    return res.json({message:" email invalid"})
}
console.log("exists:",existingUser);
const valid_password=await bcrypt.compare(password,existingUser.password)
if(!valid_password){
    return res.json({message:" password invalid"})

}
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
const validpass=bcrypt.compare(password,existingUser.password)
if (!validpass)
{
    return res.json({message:"password in valid"})
}

let userid=existingUser.id;
let role=existingUser.role;
let username=existingUser.name;
let useremail=existingUser.email;
let userpassword=existingUser.password;
let avatar=existingUser.avatar;
let token=jwtGenerator({id:userid,role:role,name:username,email:useremail,password:userpassword,avatar:avatar});

res.send({token:token})
} 

catch (error) {
        console.error(error);
    }
}
export default login;