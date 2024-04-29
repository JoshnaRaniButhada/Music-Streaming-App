const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../models/Songs");
const User = require("../models/userModel");

router.post("/create", passport.authenticate("jwt", {session: false}), async (req, res) => {
    const {name, singer,  duration, thumbnail, track} = req.body;
    if(!name || !singer || !thumbnail || !duration || !track){
        return res
            .status(301)
            .json({err: "Insufficient Details to create song."});
    }
    // // Convert "MM:SS" format to seconds
    // const [minutes, seconds] = duration.split(":");
    // const totalSeconds = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);

    // // Use totalSeconds when saving the duration to the database

    const artist = req.user._id;
    const songDetails = {name, singer, duration, thumbnail, track, artist};
    const createdSong = await Song.create(songDetails);
    return res
        .status(200)
        .json(createdSong);
});


//Get route to get all songs I have published
// router.get("/mysongs", passport.authenticate("jwt", {session: false}), async (req, res) => {
//     const currentUser = req.user;
//     const songs = await Song.find({artist: req.user._id}).populate("artist");
//     return res.status(200).json({data: songs});

// });
router.get("/mysongs", async (req, res) => {
    // Assuming you have some default songs stored in your database
    // You can modify this query to retrieve default songs as needed
    const songs = await Song.find().populate("artist");
    
    return res.status(200).json({ data: songs });
});

//When you send the artist id then, we get the listed songs of the artist published 
router.get(
    "/artist/:artistId", passport.authenticate(
        "jwt", {session: false}
    ),
async (req, res) => {
    const {artistId} = req.params;
    //chcek if the user exists
    const artist= await User.findOne({_id: artistId});
   
    /* ![] - false      (no data/empty)
       !null - true     (some data exists)
       !undefined - true( defined) */
    if(!artist) {
        return res.status(301).json({err: "Artist doesn't exist"});
    }
    const songs= await Song.find({artist: artistId});
    return res
    .status(200)
    .json({data: songs});
});



// Get route to get a single song by name
router.get(
    "/songName/:songName", 
    passport.authenticate(
        "jwt", { session: false }
    ),
    async (req, res) => {
        const { songName } = req.params; 
        
        // Create a case-insensitive regular expression pattern to match similar names
        // const regexPattern = new RegExp(songName, 'i');
        
        // Use the regex pattern to find songs with names similar to the provided input
        const songs = await Song.find({ name: songName }).populate("artist");
        
        return res
            .status(200)
            .json({ data: songs });
    }
);
    

module.exports = router;