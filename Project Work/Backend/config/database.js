const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.connect('mongodb://localhost:27017/Spotify')
    .then((data) => {
        console.log(`MongoDB Connected with server ${data.connection.host}`);
    }).catch((err) => {
        console.log("MongoDB Connection Error:", err);
    });
};

module.exports = connectDatabase;