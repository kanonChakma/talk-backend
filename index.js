import cors from "cors";
import * as dotenv from 'dotenv';
import express from 'express';
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
dotenv.config()

const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/user", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notification", notificationRoutes)
connectDB();

//error handleing
app.use(notFound);
app.use(errorHandler);


const port = process.env.PORT || 8086;
const server = app.listen(port, () => {
    console.log('listening on port ' + port)
})

//socket.io connected with server
const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
       origin: "http://localhost:3000",
    }
  })

  //create connection
  io.on("connection", (socket) => {
    console.log("connected socket.io");
    //creating a room for a particular user
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      console.log(userData._id);
      socket.emit("connected");
    })

   //joining a chat
   socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
    })

   //sending new message
   socket.on("new message", (newMessageRecieved) => {

     let chat = newMessageRecieved.chat;
     
     if(!chat.users) {
       return console.log("chat.users not defined");
     }

     chat.users.forEach((user) => {
        if(user._id === newMessageRecieved.sender._id) return;
        socket.in(user._id).emit("message recieved", newMessageRecieved);
     });
   })
 
   //typing
   socket.on("typing", (room) => socket.in(room).emit("typing"));
   socket.on("stop typing", (room) => socket.in(room).emit("stop typing"))

   socket.off("setup", () => {
     console.log("user disconnected");
     socket.leave(userData._id);
   })

  }); 
   


















