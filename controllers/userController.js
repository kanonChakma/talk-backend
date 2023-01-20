import generateToken from '../config/generateToken.js';
import User from "../model/userModel.js";

export const register = async (req, res) => {

        const { username, email, password , pic } = req.body.data;
        
        if(!username || !email || !password) {
          return res.json({
            msg: "Please Enter all the Fields",
            status: 400
          })
        }
        
        //email check
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
          return res.json({ 
            msg: "Email already used", 
            status: 400 });
        }
        
        //create user  
        const user = await User.create ({
          email,
          username,
          pic,
          password,
        });
        delete user.password;
        
      if(user) {
        res.status(201).json({ 
          _id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          pic: user.pic,
          token: generateToken(user._id), 
        });

      }else {
         res.status(400) 
         throw new Error("Failed to create"); 
      }
}

export const login = async(req, res) => {
  
    const { email, password } = req.body.data;
    const user = await User.findOne({email});

    //console.log(await user.matchPassword(password));
    if(user && (await user.matchPassword(password))){
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
       
      }else {
        return res.json({ 
        msg: "Incorrect Username or Password", 
        status: false 
      });
    }
}

export const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

export const getAllUsers = async (req, res) => {

  const keyword = req.query.search ? {
    $or: [
      { username:  { $regex: req.query.search, $options: "i" } },
      { email: { $regex: req.query.search, $options:  "i" } }
    ]
  }: {}

  const users = await User.find(keyword).find({_id: {$ne: req.user._id}});
  return res.json(users);
};

export const logOut = async(req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
     await User.deleteOne(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};