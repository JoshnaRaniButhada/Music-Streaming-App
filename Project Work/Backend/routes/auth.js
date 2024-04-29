const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helper");


//This POST route will help to register a user
router.post("/register", async (req, res) => {

    //req.body will be of the format {firstName, lastName, userName, email, password}
    const {firstName, lastName, userName, email, password} = req.body;

    //Checking whether if the email exists or not?
    const user = await User.findOne({email: email});
    if(user) {
        return res
            .status(403)
            .json({error: "This email already exists!"});
    }

    //Creating a new User in the DataBase  

    //Converting plain text of password to hash
    //abcdef ---> sdfguhik9ijhbt5r6ygbhu76tfvg
    //hash password depends on 2 parameters
    //if i can keep those two parameters same then, abcdef gives the same hash else it always keeps changing
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserData = {
        firstName, 
        lastName, 
        userName, 
        email, 
        password: hashedPassword,
    };
    const newUser = await User.create(newUserData);
    console.log(newUserData);

   //Creating token to return to the user
   const token = await getToken(email, newUser);
    
   const userToReturn = {...newUser.toJSON(), token};
   console.log(userToReturn);
   delete userToReturn.password;
   return res
   .status(200)
   .json(userToReturn);

});


// Login User
router.post("/login", async (req, res)=>{

    //Get email and password sent by user from req.body
    const {email, password} = req.body;

    //Check if user exists or not 
    const user = await User.findOne({email: email});
    if(!user){
        return res.status(403).json({err: "Incorrect email or password!"});
    }

    console.log(user);

    //If the user exists, checking if the password matches or not

    //bcrypt.compare enabled us to compare 1 password in plaintext (password from req.body) to a hashed password ( the one in our DB) securely.
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // if(!isPasswordValid) {
    //     console.log("Entered Password:", password); // Log the entered password
    //     console.log("Hashed Password:", user.password);
    //     return res.status(403).json({err: "Incorrect email or password!"})
    // }
    

    const token = await getToken(user.email, user);
    const userToReturn = {...user.toJSON(), token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);

});


module.exports = router;

