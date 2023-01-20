import Chat from "../model/chatModel.js";
import Message from "../model/messageModel.js";
import User from "../model/userModel.js";

export const getAllMessages = async (req, res) => {
   try {
    const message = await Message.find({chat: req.params.chatId})
    .populate("sender", "name pic email")
    .populate("chat")

    res.json(message);
   } catch (error) {
     res.status(400);
     throw new Error(error.message); 
   }
};

export const sendMessage = async (req, res) => {

  const {chatId, content, pic} = req.body;
  // if (!content || !chatId) {
  //   console.log("Invalid data passed into request");
  //   return res.sendStatus(400);
  // }
  const newMessage ={
    sender: req.user._id,
    content,
    chat:chatId,
    pic
   }
   
   try {
    var message = await Message.create(newMessage);
    //console.log("1", message);

    message = await message.populate("sender", "username pic")
    //console.log("2", message);
    
    message = await message.populate("chat")
    //console.log("3", message);
    
    message = await User.populate(message, {
      path: "chat.users",
      select: "username pic email",
    });
    //console.log("4", message);
    
    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
    res.json(message);
   
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
   }
};










