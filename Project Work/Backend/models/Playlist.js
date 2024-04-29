const mongoose = require("mongoose");

const Playlist = new mongoose.Schema({
   
    name: {
        type:String,
        required: true,
    },
    thumbnail: {
        type:String,                // coz url is a string
        required: true,                 
    },
    owner: {
        type:mongoose.Types.ObjectId,               //we mention the artist id i.e., we user the id from other Schema
        ref: "User", 
    },

    // 1. Songs in the Playlist
    songs: [
        {
        type:mongoose.Types.ObjectId,               
        ref: "Song",                                // Playlist contains songs 
        },
    ],
    // 2. Collaborators of the Playlist
    collaborators: [
        {
        type:mongoose.Types.ObjectId,               
        ref: "User",                                //Every collaborator is an user 
        },
    ],
});

const PlaylistModel = mongoose.model("Playlist", Playlist);             //-> ("collection name", Schema)

module.exports = PlaylistModel;