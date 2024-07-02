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
const {name,email,password}=req.body;


let existingUser = await User.findOne({email})
if( existingUser)
    {
       return  res.json({success:false,message:"user already exists.."})
    }
    
    const emailInfo = {
        to: `${email}`,
        from: 'sivaraman9344043151@gmail.com',
        subject: "Register",
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
                  background-color: #4CAF50;
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
                  color: #4CAF50;
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
                  <h1>Registration Successful</h1>
                </div>
                <div class="content">
                  <p>Hello ${name},</p>
                  <p style="font-weight: bold;">Thank you for registering!</p>
                  <p style="margin-bottom: 30px;">You are now part of our community.</p>
                  <p>If you have any questions, feel free to contact us.</p>
                  <p>Best regards,<br>Siva Technology</p>
                </div>
              </div>
            </body>
          </html>
        `
      };
    sgmail.send(emailInfo)
    .then((response)=>{console.log(response,"Email sent");
    })
    .catch(error=>{console.log(error,"Email not sent");
    })
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
let role=user1.role;
let username=user1.name;
let useremail=user1.email;
let userpassword=user1.password;
let avatar=user1.avatar;
console.log("userid:",userid);
let token=jwtGenerator({id:userid,role:role,name:username,email:useremail,password:userpassword,avatar:avatar});
 return res.status(201).json({token:token})
   
} catch (error) {
        console.error(error);
        res.json("error .....")
}
}
export default register;