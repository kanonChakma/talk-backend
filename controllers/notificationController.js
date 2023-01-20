import Notification from "../model/notificationModel.js";
import User from "../model/userModel.js";

export const createNotificaiton = async(req, res) => {
    const{chatId, recieverId} = req.body;
    const notification = {
       reciever: recieverId,
       chat: chatId
    }
    const response = await Notification.create(notification);
    if(response){
        res.status(201).json(response);
    }else{
        res.status(400)
        throw new Error("Failed to create");
    }
}

export const getNotification = async(req, res) => {
  try {
      const keyword = {
          $and:[
              {reciever: {$elemMatch: {$eq: req.user._id }}},
              {chat: {$elemMatch: {$eq: req.params.chatId}}}
          ]
      }
      const response = await Notification.find(keyword)
      .populate("reciever", "username pic")
      .populate("chat")
      .then(async(results) => {
          results = await User.populate(results, {
              path: "chat.users",
              select: "username pic email"
          })
          res.status(201).send(results);
      });
  } catch (error) {
      res.status(400)
      throw new Error(error.message);
  }
} 