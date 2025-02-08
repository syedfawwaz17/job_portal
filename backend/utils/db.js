import moongoose from "mongoose";

const connectDB = async () =>{
    try{
        await moongoose.connect(process.env.MONGO_URL);
        console.log("Connected successfully to database");

    }catch(error){
        console.log(error);
    }
}

export default connectDB;