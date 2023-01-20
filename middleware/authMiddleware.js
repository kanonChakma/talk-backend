import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const authCheck = async(req, res, next) => {
   let auth = req.headers.authorization;
   let token;
   if(auth && auth.startsWith("Bearer")) {
    try {
      token = auth.split(" ")[1];
      //decode token id
      const decoded = jwt.verify(token, process.env.JSON_SECRET);
      //console.log(decoded)
      req.user = await User.findById(decoded.id).select("-password");
      next(); 
    } catch (error) {
      res.status(401); 
      throw new Error("Not authorized, token failed"); 
    }
   }
   if(!token) {
      res.status(401);
      throw new Error("Not authorized, token failed!"); 
   }
}