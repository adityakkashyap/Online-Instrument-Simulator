const mongoose = require("mongoose");
//object data modeling (create a schema)

const connectToMongo = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/react-login");
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
};

const newSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const collection = mongoose.model("collection", newSchema);

module.exports = { connectToMongo, collection };
