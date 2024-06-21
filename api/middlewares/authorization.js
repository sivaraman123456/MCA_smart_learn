import jwt from "jsonwebtoken";
import { config } from 'dotenv';
config();
export const authorization = async (req, res, next) => {
    try {
        console.log("verify");
        let jwtToken = req.header("token");
        console.log(jwtToken);
        if (!jwtToken) {
            res.json("Invalid authorization");
        }
        const payload = jwt.verify(jwtToken, process.env.jwt_secret)
        req.header= payload.user;
        console.log(req.header);
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
  
};
