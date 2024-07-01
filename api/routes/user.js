import { Router } from "express";
import register from "../controllers/register.js";
import login from "../controllers/login.js";
import all_users from "../controllers/all_users.js";
import {authorization} from "../middlewares/authorization.js"
import { validation } from "../middlewares/validation.js"
import verify from "../controllers/verify.js";
import get_user from "../controllers/get_user.js";
import User from "../models/user.model.js";

const router=Router()

router.post("/register",validation,register)
router.post("/login",validation,login)
router.get("/verify",authorization,verify)
router.get("/all_users",all_users)
router.post("/get_user/:email",async (req, res) => {
  try {
      // req.user has the user_id from the middleware
   
      const user = await User.findOne({ email: req.params.email }).select('name email password avatar createdAt');
      if (!user) {
          return res.status(404).json("User not found");
      }
      console.log("user:",user);
     return  res.status(200).json(user);
  } catch (err) {
      console.error(err.message);
      res.status(500).json("Server error");
  }
})
router.delete("/delete_user/:userid",async(req,res)=>{
    try {
        // req.user has the user_id from the middleware
        const user = await User.findOneAndDelete({ _id: req.params.userid });
          if (!user) {
            return res.status(404).json("User not found");
        }

      return  res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error");
    }
})
export default router;