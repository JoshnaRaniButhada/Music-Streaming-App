const express = require("express");
const mongoose = require("mongoose");
const connectDatabase = require("./config/database");


const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require("./models/userModel");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");

require('dotenv').config();

const cors = require("cors");
const app = express();
const port = 8080;


app.use(
    cors({
        origin:"http://localhost:3000",
        method:["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());
    

// Initialize Passport
app.use(passport.initialize());

// Configure Passport JWT Strategy
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "SomethingeSecret"; // Retrieving the secret key from environment variable

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findOne({ _id: jwt_payload.identifier }); // Assuming identifier is the user's ID
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
}));


app.get("/", (req, res) => {
    res.send("Joooooooooooooo!");
});

app.use("/auth", authRoutes);
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);

//Connect MongoDB to our node app 
connectDatabase();

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});