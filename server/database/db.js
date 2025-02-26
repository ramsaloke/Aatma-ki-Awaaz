import mongoose from "mongoose";

const connectToDB = async ()=>{
try{
  await  mongoose.connect(process.env.MONGO_URL);
  console.log("mongodb connected successfully");
  
} catch(error) {
 console.log("Error occurs at connecting to db" , error);

 process.exit(1);
}
}

export default connectToDB;