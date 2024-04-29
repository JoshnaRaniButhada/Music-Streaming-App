const express = require("express");
const passport = require("passport");
const Playlist = require("../models/Playlist");
const User = require("../models/userModel");
const Song = require("../models/Songs");

const router = express.Router();


//Create a playlist
router.post("/create", passport.authenticate("jwt", {session: false}),

async (req, res)=> {
    const currentUser= req.user;
    const {name, thumbnail, songs} = req.body;
    if(!name || !thumbnail || !songs) {
        return res.status(301).json({err: "Insufficient Data"});
    }
    const playlistData = {
        name,
        thumbnail,
        songs,
        owner: currentUser._id,
        collaborators: [],
    }
    const playlist = await Playlist.create(playlistData);
    return res.status(200).json(playlist);
})


//Get a playlist by id
router.get(
    "/playlist/:playlistId",
passport.authenticate("jwt", {session: false}),
async (req, res)=> {
    const playlistId= req.params.playlistId;
    const playlist = await Playlist.findOne({_id: playlistId}).populate({
        path: "songs",
        populate:{
            path:"artist",
        }
    });
    
    if(!playlist) {
        return res.status(301).json({err: "Invalid Playlist ID"});
    }
    return res.status(200).json({playlist});
});

//Get all playlists made by me
router.get(
    "/get/me", passport.authenticate("jwt", {session: false}),
async (req, res)=> {
    const artistId= req.user._id;

    const playlists = await Playlist.find({owner: artistId}).populate("owner");
    return res.status(200).json({data: playlists});
});


//Get all playlists made by an artist 
router.get("/artist/:artistId", passport.authenticate("jwt", {session: false}),
async (req, res)=> {
    const artistId= req.params.artistId;

    const artist = await User.findOne({_id: artistId});
    if(!artist) {
        return res.status(304).json({err: "Invalid Artist ID"});
    }
    const playlists = await Playlist.find({owner: artistId});
    return res.status(200).json({data: playlists});
});


//Add a song to the playlist
router.post("/add/song", passport.authenticate("jwt", {session: false}),
async (req, res)=> {
    const currentUser= req.user;
    const {playlistId, songId} = req.body;
    //Get the playlist if valid
    const playlist = await Playlist.findOne({_id: playlistId});
    if(!playlist) {
        return res.status(304).json({err: "Playlist doesn't exist"});
    }
    //check if currentUser owns the playlist or is a collaborator

    if( 
        !playlist.owner.equals(currentUser._id) && 
        !playlist.collaborators.includes(currentUser._id)
    ) {
        return res.status(400).json({err: "The current user is not a owner neither a collaborator"});
    }

    //check if the song is valid
    const song = await Song.findOne({_id: songId});
    if(!song) {
        return res.status(304).json({err: "song doesn't exist"});
    }

    //Adding song to the playlist
    playlist.songs.push(songId)
    await playlist.save();              // save to the database
   
    return res.status(200).json({data: playlist});
});



module.exports = router;
