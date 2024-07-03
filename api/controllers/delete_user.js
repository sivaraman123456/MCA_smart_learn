

import User from "../models/user.model.js";

const delete_user=async(req,res)=>{
    try {
        const user = await User.findOneAndDelete({ user_id: req.user });
          if (!user) {
            return res.status(404).json("User not found");
        }

        res.json({ message: "User deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error");
    }
}

export default delete_user;