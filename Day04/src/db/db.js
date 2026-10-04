const mongoose = require("mongoose");


async function connectDB(){
    await mongoose.connect("mongodb+srv://bidyasagarsahu5_db_user:2mI1nua8o6qCbnEN@backend.nh5yvef.mongodb.net")
    console.log("MongoDB connected successfully")
}

module.exports = connectDB;