import mongoose from "mongoose";

const MessageSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    pic: { 
       type: "String"  
      }
    },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", MessageSchema);
export default Message;