import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async(req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({error:"Unauthorized: No token provided"});
        }

        const decoded = jwt.verify(token, process.env.jWT_SECRET);
        if(!decoded){s
            return res.status(401).json({error:"Unauthorized: Invalid token provided"});
        }

        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(401).json({error:"User not found"});
        }

        req.user = user;
        next();
        
    } catch (error) {
        console.log("error in protectRoute controller", error.message);
        return res.status(500).json({message:"Internal server error"})
    }
}