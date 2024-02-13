import mongoose from "mongoose";

// Set strictQuery to false to avoid the DeprecationWarning
mongoose.set('strictQuery', false);

const connectDatabase = async () => {
  try {
    console.log(`MongoDB trying -> ` + process.env.MONGO_URL);

    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`MongoDB Connected`);
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDatabase;
