// const crypto = require('crypto');
// const userController = require('../controllers/user.controller');

// async function validateRefreshToken(reqObject) {
//     /// Get Refresh Token value from req.header 
//     var bearer = (reqObject.headers.authorization).split(" ")[1];
//     // Validate Passing refreshtoken from database
//     let getuser = await userController.getuserByToken(bearer);
//     //console.log("In validate Token",getuser);
//     if (getuser) {
//       return getuser;
//     }else{
//       return false;
//     }
//   }
  
  
//   function rejectToken(req, res, next) {
//     db.client.rejectToken(req.body, next);
//   }
  
  
// function generateRefreshToken(user,role) {
//     return refreshToken = user.user_id.toString()+ '.' +role + '.' + crypto.randomBytes(40).toString('hex');
// }

//   //////////////////////
// // token generation //
// //////////////////////
// function generateAccessToken(req, res, next) {
//     req.token = req.token ||  {};
//     req.token.accessToken = jwt.sign({
//       id: req.user.id,
//       id: req.user.id
//     }, SECRET, {
//       expiresIn: TOKENTIME
//     });
//     next();
//   }

//   module.exports = {
//     validateRefreshToken : validateRefreshToken,
//     rejectToken : rejectToken,
//     generateRefreshToken : generateRefreshToken,
//     generateAccessToken : generateAccessToken
//   }