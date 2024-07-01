import jwt from "jsonwebtoken";
import { config } from 'dotenv';
config();
export const authorization = async (req, res, next) => {
    try {
        console.log("verify");
        let jwtToken = req.header("token");
        console.log(jwtToken);
        if (!jwtToken) {
          return  res.status(401).json({message:"Invalid authorization"});
        }
        // const payload = jwt.verify(jwtToken, process.env.jwt_secret)

        // req.header= payload.user;
        // console.log(req.header);
        // next();

        return jwt.verify(jwtToken,process.env.jwt_secret,function(err, decoded) {
          if (err) {
              return res.json({
                  success: false,
                  message: "Failed to authenticate token.",
              });
          }
          req.user = decoded;
          return next()})
    } catch (error) {
        console.error(error);
      return  res.status(500).json({ message: "Internal server error" });
    }
  
};
