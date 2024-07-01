import User from "../models/user.model.js";

const get_user= async (req, res) => {
    try {
        // req.user has the user_id from the middleware
        console.log("user_id:",req.user.user.id);
        const user = await User.findOne({ _id: req.user.user.id }).select('name email password');
        if (!user) {
            return res.status(404).json("User not found");
        }
        console.log("ID:",req.user.id);
       return  res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error");
    }
}

export default get_user;
