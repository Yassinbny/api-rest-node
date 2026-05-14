import mongoose from "mongoose";

const connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mi_blog");
    console.log("connected to db");

    // Parametros para pasar dentro de objeto
    // usenewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    console.log("Database connected");
  } catch (error) {
    console.log(error);
    throw new Error("Error while connecting to database");
  }
};

export default connection;
