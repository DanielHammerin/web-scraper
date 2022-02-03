import mongoose from "mongoose";

export const connectToDb = async () => {
    console.log("Connecting to database...");
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log("Connection to DB established. Connected to: " + process.env.MONGODB_URI))
        .catch((err) => console.log("DB connection error: " + err));
}

export const disconnect = async () => {
    await mongoose.disconnect()
        .then(() => {
            console.log("Disconnected from DB.");
        })
}
