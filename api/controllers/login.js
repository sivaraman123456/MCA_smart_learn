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
// const emailInfo={
//     to:`${email}`,
//     from:'sivaraman9344043151@gmail.com',
//     subject:"Login ",
//     html:`<h1 style="color:green; font-family:Arial, sans-serif;">Successfully Logged In!</h1>`
// }
const emailInfo = {
    to: `${email}`,
    from: 'sivaraman9344043151@gmail.com',
    subject: "Login",
    html: `
      <html>
        <head>
          <style>
            /* CSS styles for the email */
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              background-color: #f0f0f0;
              margin: 0;
              padding: 0;
            }
            .container {
              width: 100%;
              max-width: 600px;
              margin: auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              background-color: #2196F3;
              color: #ffffff;
              text-align: center;
              padding: 10px;
              border-top-left-radius: 8px;
              border-top-right-radius: 8px;
            }
            .content {
              padding: 20px;
            }
            h1 {
              color: #2196F3;
              font-size: 24px;
              margin-bottom: 10px;
            }
            p {
              font-size: 16px;
              margin-bottom: 10px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Successfully Logged In!</h1>
            </div>
            <div class="content">
        <p style="font-weight: bold;">You have successfully logged in to your account.</p>
              <p>If you did not perform this action, please contact us immediately.</p>
              <p>Best regards,<br>Siva Technology </p>
            </div>
          </div>
        </body>
      </html>
    `
  };
  
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