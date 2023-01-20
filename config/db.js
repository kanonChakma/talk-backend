import mongoose from "mongoose";

const connectDB = async() => {
 try{
      await mongoose.connect(process.env.DB_URL, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
    })
    console.log('connected successfully');
  }catch(err){
      console.log(err);
      process.exit(1);
  }
}

export default connectDB;