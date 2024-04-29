const jwt = require("jsonwebtoken");

tokenFunction = {};

tokenFunction.getToken = async (email, user)=>{
    
    const token = jwt.sign(
        {identifier: user._id},
        "SomethingeSecret"
    );
    return token;
};


module.exports = tokenFunction;