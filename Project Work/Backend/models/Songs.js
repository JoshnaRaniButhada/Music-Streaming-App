const mongoose = require("mongoose");

const Songs = new mongoose.Schema({
   
    name: {
        type:String,
        required: true,
    },
    singer : {
        type: String,
        required: true,
    },
    duration: {
        type:String,
        required: true,
    },
    thumbnail: {
        type:String,                // coz url is a string
        required: true,                 
    },
    track: {
        type:String,
        required: true, 
    },
    artist: {
        type:mongoose.Types.ObjectId,               //we mention the artist id i.e., we user the id from other Schema
        ref: "User", 
    },
});

const SongModel = mongoose.model("Songs", Songs);             //-> ("collection name", Schema)

module.exports = SongModel;