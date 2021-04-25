const jwtStratergy = require("passport-jwt").Strategy;
const extratcJWT = require("passport-jwt").ExtractJwt;

// const userController = require("../controller/user.controller");
const userController = require("../controller/user.controller");
const personController = require("../controller/person.controller");

const constants = require("../constants");

module.exports = passport => {
  let opts = {};
  opts.jwtFromRequest = extratcJWT.fromAuthHeaderAsBearerToken();
  //console.log("opts.jwtFromRequest :",extratcJWT.fromAuthHeaderAsBearerToken());
  opts.secretOrKey = constants.secret;
  let finalResult;

  passport.use(new jwtStratergy(opts, async (jwt_payload, done) => {
      try {
        //console.log("jwt_payload is:",jwt_payload);
        // const user = await userController.getUserById(jwt_payload._id);
        var userRole = jwt_payload.role;
        var userId = jwt_payload._id;
        console.log("userRole : ",userRole);
        var user = '';
        if(userRole === ROLES.user){
          user = await userController.getuserById(userId);
        }else if(userRole === ROLES.DELIVERY_BOY){
          user = await personController.getPersonById(userId);
          console.log("in Delivery Boy");
        }
        if (user == null) {
          finalResult = {
            message: "Unauthorised user details",
            success: false
          };
          console.log("User Not Found");
          //res.json ({ success: false, message: "Unauthorised user details"}); // 1st Response
          done(err || finalResult, false);
        } else {
          console.log("Logged in user:");
          done(null, user);
        }
      } catch (err) {
        console.log("In catch Block");
        done(err, false);
      }
    })
  );
};
