import jwt from "jsonwebtoken";
import {config} from 'dotenv';

config();

export  function jwtGenerator(id,role,name,email,password,avatar){
const payload={user:id,role:role,name:name,email:email,password:password,avatar:avatar}
const token=jwt.sign(payload,process.env.jwt_secret,{expiresIn:"1hr"})
return token;
}