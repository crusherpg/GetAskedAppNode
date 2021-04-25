

/**
 * @summary Provide Api to Reset Password
 * @param phone, otp, password
 * @returns user
 *
 * @author Girish Pawar
 **/
router.post(
  "/resetpassword",
  passport.authenticate("jwt", { session: false }),
  userValidator.resetpasswordChecks,
  async (req, res, next) => {
    try {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      //console.log("errors is:",errors);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          success: false,
          message: "Please provide valid details.",
          errors: errors.array(),
        });
      }
      //console.log("req.user is:",req.user);
      let user = req.user;

      // check if user deleted
      if (user.status === MODEL_STATUS.TRASHED || user.status === MODEL_STATUS.INACTIVE) {
        return res.json({
          success: false,
          message: "Phone associated with deleted or inactive account.",
        });
      } else if (user != null && user.status === MODEL_STATUS.ACTIVE) {
        // Update New Password
        newuser = await userController.updatePassword(user._id, req.body.password);

        // Return New Updated user object
        return res.json({
          success: true,
          message: "New Password Set Successfully.",
          data: newuser,
        });
      }
    } catch (err) {
      // add this line to include winston logging     
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
  }
);

/**
 * @summary Provide Api to verify OTP
 * @param user
 * @returns user
 *
 * @author Girish Pawar
 **/
router.post(
  "/verifyotp",
  userValidator.verifyChecks,
  async (req, res, next) => {
    try {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      //console.log("errors is:",errors);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          success: false,
          message: "Please provide valid details.",
          errors: errors.array(),
        });
      }

      // check if user already exists, deleted , unique phone and email
      let user = await userController.getuserById(req.body.userId);
      if (user == null || (user != null && (user.status === MODEL_STATUS.TRASHED || user.status === MODEL_STATUS.INACTIVE))) {
        return res.json({
          success: false,
          message: "Phone associated with deleted or inactive account.",
        });
      } else if (user != null) {
        if (req.body.otp != "" && req.body.otp.length === 6) {
          let smsResult = await utils.helpers.verifyAuthyToken(user.authyId, req.body.otp);
          if (smsResult != "" && typeof smsResult == "object") {
            if (smsResult.success != false) {
              /// generate Token
              const token = utils.helpers.generateToken(user, ROLES.user);

              user.accessToken = token;
              user.status = MODEL_STATUS.ACTIVE;
              user.isPhoneVerified = true;
              //user.deviceDetails = [];
              //user.deviceDetails.push(req.body.deviceDetails);

              await userController.updateuser(user);
              // user exists and password matches authenticate the user
              return res.json({
                success: true,
                message: "OTP Verified Successfully.",
                data: user,
              });
            } else {
              return res.json({
                status: smsResult.error_code || 501,
                message: smsResult.message || "Having issue with OTP verification!",
                success: false,
              });
            }
          }
        }
      }
    } catch (err) {
      // add this line to include winston logging     
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
  }
);



////// Old Signup Function

router.post(
  "/signup",
  //passport.authenticate("jwt", { session: false }),
  //multer({ dest: 'temp/', limits: { fieldSize: 10 * 1024 * 1024 } }).single('profile'),
  userValidator.signupChecks,
  async (req, res, next) => {
    try {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      //console.log("errors is:",errors);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          success: false,
          message: "Please provide valid user details.",
          errors: errors.array(),
        });
      }

      // check if user already exists, deleted , unique phone and email
      let user = await userController.checkUniqueuser(req.body.phoneWithCountry);
      console.log("Got data from controller")
      if (user != null && (user.status === MODEL_STATUS.TRASHED || user.status === MODEL_STATUS.INACTIVE)) {
        return res.json({
          success: false,
          message: "Details associated with deleted or inactive account.",
        });
      } else if (user != null && user.status === MODEL_STATUS.ACTIVE) {
        return res.json({
          success: false,
          message: "user already exists, please use different phone.",
        });
      } 
      // "id":"5ec65adb8cd6dc40bb035cc2",
      console.log("id is:",req.body.id);;
      if(req.body.id != '' && req.body.id != undefined)     // this scenario is used while edit phone number case
      {

        let user = await userController.getuserById(req.body.id);

        if (user == null || user == undefined) {
          return res.json({
            success: false,
            message: "Details not associated with any other user.",
          });
        }

        //else if (user != null && user.status === MODEL_STATUS.PENDING) {
        // if exist and status is Pending
        newuser = req.body;
        newuser._id = req.body.id;
        //newuser.deviceDetails = [];
        //newuser.deviceDetails = JSON.parse(JSON.stringify(req.body.deviceDetails).replace(/"\s+|\s+"/g,'"')); ///(req.body.deviceDetails).trim();
        
        newuser.password = await userController.hashPassword(req.body.password);

        if(user.phoneWithCountry == req.body.phoneWithCountry)
        {
          console.log("In if condition SAME");
          //newuser.otp = await utils.helpers.sendOTP(req.body.phoneWithCountry);
          let smsResult = await utils.helpers.sendAuthySMS(user.authyId);
          if (smsResult != "" && typeof smsResult == "object") {
            if (smsResult.success == true) {

              var filePath = "users/" + req.body.id + "/idProof/";
              const idFile = await utils.helpers.uploadObjectS3(
                req.body.idFile,
                filePath
              );
              if(idFile != false)
              {
                newuser.idFile = idFile;
                // Update existing user with new password
                userResult = await userController.updateuser(newuser);
                // return the user
                return res.json({
                  success: true,
                  message: "Looks like you have already registered.",
                  data: userResult,
                });
              }else{
                res.json({
                  status: 502,
                  message: "Trying to upload wrong filetype in Id Proof.",
                  success: false,
                });
                return;
              }
            } else {
              return res.json({
                status: smsResult.error_code || 501,
                message: smsResult.message || "Having issue with SMS sending operation!",
                success: false,
              });
            }
          }
        }else{

            console.log("in else condition differnet ");
            // added register Twilio User method after saving user
            let twillioResult = await utils.helpers.registerTwilioUser(newuser);
            if (twillioResult != "" && typeof twillioResult == "object") {
              if (twillioResult.success == true) {
                newuser.authyId = twillioResult.user.id;
                let smsResult = await utils.helpers.sendAuthySMS(user.authyId);
                if (smsResult != "" && typeof smsResult == "object") {
                  if (smsResult.success == true) {

                    var filePath = "users/" + req.body.id + "/idProof/";
                    const idFile = await utils.helpers.uploadObjectS3(
                      req.body.idFile,
                      filePath
                    );
                    if(idFile != false)
                    {
                      newuser.idFile = idFile;
                      // Update existing user with new password
                      userResult = await userController.updateuser(newuser);
                      return res.json({
                        success: true,
                        message: "Looks like you have already registered.",
                        data: userResult,
                      });
                    }else{
                      res.json({
                        status: 502,
                        message: "Trying to upload wrong filetype in Id Proof.",
                        success: false,
                      });
                      return;
                    }
                    
                  } else {
                    return res.json({
                      status: smsResult.error_code || 501,
                      message: smsResult.message || "Having issue with SMS sending operation!",
                      success: false,
                    });
                  }
                }
              } else {
                return res.json({
                  status: twillioResult.error_code || 502,
                  message: twillioResult.message || "Having issue with user registration operation!",
                  success: false,
                });
              }
            }
        }

      } else if (user == null) {
        req.body._id = ObjectId();
        var filePath = "users/" + req.body._id + "/idProof/";
        const idFile = await utils.helpers.uploadObjectS3(
          req.body.idFile,
          filePath
        );
        if(idFile != false)
        {
          req.body.idFile = idFile;
          // if does not exist add the user
          newuser = await userController.adduser(req.body);
          if (newuser != "" && newuser.success != false) {
            // return the user
            res.json({
              success: true,
              message: "Congrats, user registered Successfully.",
              data: newuser,
            });
          } else {
            return res.json({
              status: 502,
              message: "Having issue with user saving operation",
              success: false,
            });
          }
        }else{
          res.json({
            status: 502,
            message: "Trying to upload wrong filetype in Id Proof.",
            success: false,
          });
          return;
        }
      }
    } catch (err) {
      // add this line to include winston logging     
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
  }
);

/**
 * @summary Provide Api to Reset old Password
 * @param token, password
 * @returns user
 *
 * @author Girish Pawar
 **/
router.post("/resetPassword_old", async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const user = await userController.getuserPhone(token);
    if (user == null) {
      return res.json({
        valid: false,
        message: "Token is not valid or expired.",
      });
    } else {
      await userController.updatePassword(user._id, password);
      return res.json({
        valid: true,
      });
    }
  } catch (err) {
    next(err);
  }
});

/**
 * @summary Provide Api to compare password
 * @param email, password
 * @returns boolean value
 *
 * @author Girish Pawar
 **/
router.post("/comparePassword", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await userController.getuserByEmail(email);
      if (user == null) res.send(false);
      else {
        const isMatch = await userController.comparePasswords(password, user.password);
        res.send(isMatch);
      }
    } else {
      res.send(false);
    }
  } catch (err) {
    next(err);
  }
});

/**
 * @summary Provide Api to update password
 * @param userId, password
 * @returns user
 *
 * @author Girish Pawar
 **/
router.post(
  "/updatePassword",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { id, password } = req.body;
      const user = await userController.getuserById(id);
      if (user == null) {
        return res.status(404).send("user not found.");
      } else {
        user.password = password;
        user.modifiedBy = req.user._id;
        const updateduser = await userController.updateuser(user);
        return res.json(updateduser);
      }
    } catch (err) {
      // add this line to include winston logging     
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
  }
);

/**
 * @summary Provide Api to forgot password old
 * @param email
 * @returns boolean
 *
 * @author Girish Pawar
 **/
router.post("/forgotPassword_old", async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await userController.getuserByEmail(email);
    if (user != null) {
      const token = await new Promise((resolve) => {
        crypto.randomBytes(20, (err, buffer) => {
          resolve(buffer.toString("hex"));
        });
      });
      user.reset_password_token = token;
      user.reset_password_expires = Date.now() + 8640000;
      await userController.updateuser(user);
      const url = `${req.protocol}://${req.get("host")}/reset-password?token=${token}`;
      emailController.forgotPasswordMail(user.email, url, user.name);
      res.send(true);
    } else {
      res.send("user not found");
    }
  } catch (err) {
    next(err);
  }
});

/**
 * @summary Provide Api to get user's addressList
 * @param -
 * @returns addressList
 *
 * @author Girish Pawar
 **/
router.get(
  "/getAllAddress",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const addressList = await userController.getAllAddress(req.user._id);
      if (addressList != null && typeof addressList == "object" && addressList.length > 0) {
        return res.status(200).send({
          data: addressList,
          success: true,
          message: "Address List return Successfully.",
        });
      } else {
        return res.status(404).send({
          success: false,
          message: "Error retrieving Address List.",
        });
      }
    } catch (err) {
      // add this line to include winston logging     
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
  }
);

/**
 * @summary Provide Api to get user's Address by AddressId
 * @param addressId
 * @returns address
 *
 * @author Girish Pawar
 **/
router.get(
  "/getAddressById",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      let addressId = req.query.addressId;
      // Check if data is valid
      if (addressId) {
        const address = await userController.getAddressById(req.user._id, addressId);
        if (address != null && typeof address == "object") {
          return res.status(200).send({
            data: address,
            success: true,
            message: "Address return Successfully.",
          });
        } else {
          return res.status(404).send({
            success: false,
            message: "Error retrieving Address.",
          });
        }
      } else {
        return res.status(400).send({
          message: "Address Id can not be empty!",
          success: false,
          error: true,
        });
      }
    } catch (err) {
      // add this line to include winston logging     
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
  }
);

/**
 * @summary Provide Api to Add user's new address
 * @param address
 * @returns user
 *
 * @author Girish Pawar
 **/
router.post(
  "/addAddress",
  passport.authenticate("jwt", { session: false }),
  userValidator.addressChecks,
  async (req, res, next) => {
    try {
      let address = req.body;
      address.createdOn = new Date();
      address.modifiedOn = new Date();

      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      //console.log("errors is:",errors);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          success: false,
          message: "Please provide valid address details.",
          errors: errors.array(),
        });
      }

      let location = address.location.split(",");
      address.location = location;
      const user = await userController.addAddress(req.user._id, address);
      if (user != null && typeof user == "object") {
        return res.status(200).send({
          data: user,
          success: true,
          message: "New address added Successfully.",
        });
      } else {
        return res.status(500).send({
          success: false,
          message: "Error Adding Address.",
        });
      }
    } catch (err) {
      // add this line to include winston logging     
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
  }
);

/**
 * @summary Provide Api to Update user's address
 * @param address
 * @returns user
 *
 * @author Girish Pawar
 **/
router.put(
  "/updateAddress",
  passport.authenticate("jwt", { session: false }),
  userValidator.addressChecks,
  async (req, res, next) => {
    try {
      let address = req.body;
      address._id = req.body.addressId;
      //console.log(" address._id:", address._id);
      address.modifiedOn = new Date();

      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      //console.log("errors is:",errors);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          success: false,
          message: "Please provide valid address details.",
          errors: errors.array(),
        });
      }

      const oldAddress = await userController.getAddressById(req.user._id, address._id);

      if (oldAddress != null && typeof oldAddress == "object") {
        address.createdOn = oldAddress.createdOn;
        let location = address.location.split(",");
        address.location = location;

        const user = await userController.updateAddress(req.user._id, address);
        if (user != null && typeof user == "object") {
          return res.status(200).send({
            data: user,
            success: true,
            message: "Address updated Successfully.",
          });
        } else {
          return res.status(500).send({
            success: false,
            message: "Error updating Address.",
          });
        }
      } else {
        return res.status(404).send({
          message: "Adress not found!",
          success: false,
          error: true,
        });
      }
    } catch (err) {
      // add this line to include winston logging     
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
  }
);

/**
 * @summary Provide Api to Delete user's address by addressId
 * @param addressId
 * @returns user
 *
 * @author Girish Pawar
 **/
router.delete(
  "/deleteAddress/:addressId",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      let addressId = req.params.addressId;
      // Check if data is valid
      if (addressId) {
        const address = await userController.getAddressById(req.user._id, addressId);
        if (address != null && typeof address == "object") {
          const user = await userController.deleteAddress(req.user._id, addressId);
          if (user != null && typeof user == "object") {
            return res.status(200).send({
              data: user,
              success: true,
              message: "Address Deleted Successfully.",
            });
          } else {
            return res.status(500).send({
              success: false,
              message: "Error Deleting Address.",
            });
          }
        } else {
          return res.status(404).send({
            message: "Adress not found!",
            success: false,
            error: true,
          });
        }
      } else {
        return res.status(400).send({
          message: "Adress Id can not be empty!",
          success: false,
          error: true,
        });
      }
    } catch (err) {
      // add this line to include winston logging     
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
  }
);

/**
 * @summary Provide Api to get user's favouriteList
 * @param -
 * @returns favouriteList
 *
 * @author Girish Pawar
 **/
router.get(
  "/getAllFavourite",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const favouriteList = await userController.getAllFavourite(req.user._id);
      if (favouriteList != null && typeof favouriteList == "object" && favouriteList.length > 0) {
        return res.status(200).send({
          data: favouriteList,
          success: true,
          message: "Favourite List return Successfully.",
        });
      } else {
        return res.status(404).send({
          success: false,
          message: "You haven't added any product into favorite yet.",
        });
      }
    } catch (err) {
      // add this line to include winston logging     
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
  }
);

/**
 * @summary Provide Api to get user's favourite by favouriteId
 * @param favouriteId
 * @returns favourite
 *
 * @author Girish Pawar
 **/
router.get(
  "/getFavouriteById",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      let favouriteId = req.query.favouriteId;
      // Check if data is valid
      if (favouriteId) {
        const favourite = await userController.getFavouriteById(req.user._id, favouriteId);
        if (favourite != null && typeof favourite == "object") {
          return res.status(200).send({
            data: favourite,
            success: true,
            message: "Favourite return Successfully.",
          });
        } else {
          return res.status(404).send({
            success: false,
            message: "Please provide valid details.",
          });
        }
      } else {
        return res.status(400).send({
          message: "Favourite Id can not be empty!",
          success: false,
          error: true,
        });
      }
    } catch (err) {
      // add this line to include winston logging     
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
  }
);

/**
 * @summary Provide Api to add user's Favourite
 * @param favourite
 * @returns user
 *
 * @author Girish Pawar
 **/
router.post(
  "/addFavourite",
  passport.authenticate("jwt", { session: false }),
  userValidator.favouriteChecks,
  async (req, res, next) => {
    try {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      //console.log("errors is:",errors);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          success: false,
          message: "Please provide valid details.",
          errors: errors.array(),
        });
      }

      let favourite = req.body;
      favourite.createdOn = new Date();
      // Check if data is valid
      // if (favourite.product_id) {
      //console.log((favourite.product_id).length);

      /**
       * @todo Verify following
       */

      const user = await userController.addFavourite(req.user._id, favourite);
      // let user = await userController.getuserById(req.user._id);
      if (user != null && typeof user == "object") {
        // user.favouriteList.push(favourite);
        // const newuser = await userController.updateuser(user);
        return res.status(200).send({
          data: user.favouriteList, // newuser,
          success: true,
          message: "Favourite added Successfully.",
        });
      } else {
        return res.status(500).send({
          success: false,
          message: "Error Adding Favourite.",
        });
      }

      // } else {
      //   return res.status(400).send({
      //     message: "Favourite data can not be empty!",
      //     success: false,
      //     error: true
      //   });
      // }
    } catch (err) {
      // add this line to include winston logging     
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
  }
);

/**
 * @summary Provide Api to Delete user's Favourite by favouriteId
 * @param favouriteId
 * @returns user
 *
 * @author Girish Pawar
 **/
router.delete(
  "/deleteFavourite/:favouriteId",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      let favouriteId = req.params.favouriteId;
      // Check if data is valid
      if (favouriteId) {
        const favourite = await userController.getFavouriteById(req.user._id, favouriteId);
        if (favourite != null && typeof favourite == "object") {
          const user = await userController.deleteFavourite(req.user._id, favouriteId);
          if (user != null && typeof user == "object") {
            return res.status(200).send({
              data: user.favouriteList,
              success: true,
              message: "Favourite Product Removed Successfully.",
            });
          } else {
            return res.status(500).send({
              success: false,
              message: "Error Deleting Address.",
            });
          }
        } else {
          return res.status(404).send({
            message: "Favourite not found!",
            success: false,
            error: true,
          });
        }
      } else {
        return res.status(400).send({
          message: "Favourite Id can not be empty!",
          success: false,
          error: true,
        });
      }
    } catch (err) {
      // add this line to include winston logging     
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
  }
);

