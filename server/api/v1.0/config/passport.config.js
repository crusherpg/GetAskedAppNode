// const jwtStratergy = require("passport-jwt").Strategy;
// const extratcJWT = require("passport-jwt").ExtractJwt;

// const userController = require("../controllers/user.controller");
// const personController = require("../controllers/person.controller");

// //const constants = require("./constants");

// const constants = {
//     fileUploadPath: __dirname + "\\uploads\\",
//     secret: "Up4Cofee",
//     DEFAULT_USER_PASSWORD: "up@4cofee",
//     DEFAULT_TIMEZONE: "Asia/Dubai",
//     AGE_LIMIT : 21
//   };

// module.exports = passport => {
//   let opts = {};
//   opts.jwtFromRequest = extratcJWT.fromAuthHeaderAsBearerToken();
//   //console.log("opts.jwtFromRequest :",opts.jwtFromRequest);
//   opts.secretOrKey = constants.secret;
//   let finalResult;

//   passport.use(new jwtStratergy(opts, async (jwt_payload, done) => {
//       try {
//         //console.log("jwt_payload is:",jwt_payload);
//         // const user = await userController.getUserById(jwt_payload._id);
//         var userRole = jwt_payload.role;
        
//         let user = {};
//         if(userRole === ROLES.USER){
//           /// For Setting Mobile User's authorisations
//           user = await userController.getuserById(jwt_payload.id);
//         }else{     //if(userRole === ROLES.ADMIN){
//           /// For Setting Admin User's authorisations
//           user = await personController.getPersonById(jwt_payload.id);
//         }
//         //console.log("user object is: ",user);
//         if (user == null) {
//           finalResult = {
//             message: "Unauthorised user details",
//             success: false
//           };
//           console.log("User Not Found 123");
//           //res.json ({ success: false, message: "Unauthorised user details"}); // 1st Response
//           done(null, false);
//         } else {
//           console.log("Logged in user:");
//           user.dataValues.person_role = userRole;
//           //console.log(user.dataValues);
//           done(null,user.dataValues);
//         }
//       } catch (err) {
//         console.log("In catch Block");
//         done(err, false);
//       }
//     }),

//   );
// };
