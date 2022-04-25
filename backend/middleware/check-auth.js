const jwt = require("jsonwebtoken");
//called in routes/ xxx.js files
module.exports =(req,res,next)=>{
  try{
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, "secret_this_should_be_longer")// checks to see if token is valid
    next(); // if valid , perform code .js file
  }catch(err){
    res.status(401).json({message: "Auth failed from middleware"}) // cancles http request if jwt token fails
  }

};