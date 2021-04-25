// /**
//  * This used for library functions used in controller functions for repetitive actions.
//  */

// const crypto = require("crypto");
// const moment = require("moment");
// const writerFs = require("fs").promises;
// const fs = require("fs");
// const stringify = require("json-stringify-safe");
// const _ = require("lodash");
// var format = require("biguint-format");

// // Require `PhoneNumberFormat`.
// const PNF = require('google-libphonenumber').PhoneNumberFormat;
 
// // Get an instance of `PhoneNumberUtil`.
// const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
 

// const userController = require('./server/api/v1.0/controllers/user.controller');


// /// For Multipart Form-data
// const multer = require("multer");

// const mongoid = require("mongoid");
// const ObjectId = require("mongoose").Types.ObjectId;
// //const blobUtil = require("blob-util");

// ///////// TWILLIO

// const accountSid = process.env.ACCOUNT_SID;
// const authToken = process.env.AUTH_TOKEN;
// const twilioNumber = process.env.TWILIO_NUMBER;
// const authyKey = process.env.PRODUCTION_API_KEY;
// const verificationSid = process.env.VERIFICATION_SID;

// var authy = require("authy")(authyKey);

// const twilioClient = require("twilio")(accountSid, authToken);

// //////// AWS
// const AWS = require("aws-sdk");

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

// // The name of the bucket that you have created
// const BUCKET_NAME = process.env.S3_BUCKET;
// const REGION = process.env.AWS_REGION;

// const jwt = require("jsonwebtoken");
// const constants = require("./server/api/v1.0/constants");

// const getConnection = require('./config/mysqlconn.config')


// // const utils = require('util');
// // const writeFile = utils.promisify(fs.writeFile);

// function randomValueHex(len) {
//   return crypto
//     .randomBytes(Math.ceil(len / 2))
//     .toString("hex") // convert to hexadecimal format
//     .slice(0, len); // return required number of characters
// }

// /// thought map
// function toTitleCase(str) {
//   return str;
//   // return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
// }

// // Print any circular object
// function printObject(circularObj) {
//   //var circularObj = {};
//   circularObj.circularRef = circularObj;
//   circularObj.list = [circularObj, circularObj];
//   console.log(stringify(circularObj, null, 3));
// }

// /* For extracting the file extention from base64 string */
// function base64MimeType(encoded) {
//   var result = null;
//   if (typeof encoded !== "string") {
//     return result;
//   }
//   var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

//   if (mime && mime.length) {
//     result = mime[1];
//   }
//   return result;
// }

// /* Check valid fileTypes of file upload Field Data */
// function allowedFiletypes(fileExt) {
//   const allowedTypes = [
//     { filetype: "pdf", mimetype: "application/pdf" },
//     { filetype: "png", mimetype: "image/png" },
//     { filetype: "jpeg", mimetype: "image/jpeg" },
//   ];
//   let result = _.find(allowedTypes, function (o) {
//     return o.mimetype === fileExt;
//   });
//   //console.log("result is:",result);
//   if (result) {
//     return result;
//   } else {
//     return false;
//   }
// }

// /* Upload base64 data into file and return url */
// async function uploadBase64intoFile(base64String, layoutId) {
//   const mimeInfo = this.base64MimeType(base64String);
//   var fileTypeStatus = this.allowedFiletypes(mimeInfo);

//   //path of folder where you want to save the image.
//   const localPath = `${uploadPath}${layoutId}/`;
//   const localPath1 = `${layoutId}/`;
//   var uploadedFile = "";
//   console.log("localPath is:", localPath);

//   if (fileTypeStatus != false) {
//     /// got valid filetype of uploaded file
//     var ext = fileTypeStatus.filetype;
//     var filename = `${ext}-${mongoid()}.${ext}`;
//     let base64File = base64String.split(";base64,").pop();

//     //Check that if directory is present or not.
//     if (!fs.existsSync(localPath)) {
//       fs.mkdirSync(localPath, { recursive: true }, (err) => {});
//     }

//     let isFileWritten = false;

//     /**
//      * write into file and return path
//      */
//     await writerFs
//       .writeFile(localPath + filename, base64File, { encoding: "base64" })
//       .then(() => {
//         isFileWritten = localPath1 + filename;
//       })
//       .catch((err) => {
//         return false;
//       });

//     return isFileWritten;
//   } else {
//     return false;
//   }
// }

// /* Send OTP to Mobile Number */
// async function sendOTP(phone) {
//   //// Add Twillio send SMS Code Here
//   var otp = 123456;
//   return otp;
// }

// /**
//  * @summary Register user to twilio
//  * @param user, callbackfunction
//  * @returns callback
//  *
//  * @author Girish Pawar
//  * @reviewer Girish Pawar
//  *
//  **/

//  function sendVerificationOTP(user)
//  {
//   const channel = 'sms';
//   let verificationRequest;
//   let finalResult = {};
//   console.log("user is:",user);
  
  
//     //return new Promise((resolve, reject) => {
//     /////  APP_HASH : 'hMzd6fP7C/k'
//     return new Promise((resolve, reject) => {
//       twilioClient.verify.services(verificationSid)
//       .verifications
//       .create({ to: '+'+user.phoneWithCountry, channel},      
//       function (err, response) {
//         if (err) {
//           finalResult = {
//             status: 401,
//             message: err,
//             success: true
//           }; 
//           resolve(finalResult);
//         }
//         try {
//           finalResult = {
//             status: 200,
//             message: "Sent OTP to mobile number",
//             success: true,
//             data : response
//           };
//           resolve(finalResult);

//         } catch (err) {
//           finalResult = {
//             status: 501,
//             message: "Having issue with SMS OTP sending operation",
//             success: false
//           }; 
//           reject(finalResult);
//         }
//       });
//     });
//     /*  
//     /// Getting Pending Status in Free Account
//     finalResult = {
//       status: 200,
//       message: "Sent OTP to mobile number",
//       success: true,
//       data:verificationRequest
//     };

//   } catch (e) {
//     console.log("In catch block",e);
//     //return res.status(500).send(e);
//     finalResult = {
//       status: 500,
//       message: e,
//       success: false,
//     };
//   } 
//   return finalResult;
//     //return res.render('verify', { title: 'Verify', user: req.user, errors });
//   */
// }
// /**
//  * @summary Verify Phone otp for user
//  * @param user
//  * @returns response
//  *
//  * @author Girish Pawar
//  **/

// async function checkVerificationOTP(user)
// {
//   let finalResult = {};
//   var code = user.otp;
//   var phone  = user.phoneWithCountry;
//   console.log("User Provided Phone : ",phone);
//   return new Promise((resolve, reject) => {
//     twilioClient.verify.services(verificationSid)
//       .verificationChecks
//       .create({ to: '+'+phone  , code },
//       function (err, response) {
//         if (err) {
//           finalResult = {
//             status: err.code,
//             message: "Please provide correct OTP.",
//             success: false
//           }; 
//           resolve(finalResult);
//         }
//         try {
//           finalResult = {
//             status: 200,
//             success: true,
//             data : response
//           };
//           resolve(finalResult);
//         } catch (err) {
//           finalResult = {
//             status: 501,
//             message: "Having issue with OTP verification",
//             success: false
//           }; 
//           reject(finalResult);
//         }
//       });
//   });
//   /* Old Code
//   let verificationResult;
//   let finalResult = {};
  
//   try {
//     verificationResult = twilioClient.verify.services(verificationSid)
//       .verificationChecks
//       .create({ code, to: user.phoneWithCountry });
//     console.log("verificationResult is:",verificationResult);     /// Getting Pending Status in Free Account
//       finalResult = {
//         status: 200,
//         message: "OTP Verified Successfully",
//         success: true,
//         data:verificationResult
//       };
//     } catch (e) {
//       console.log("In catch block",e);
//       //return res.status(500).send(e);
//       finalResult = {
//         status: 500,
//         message: e,
//         success: false,
//       };
//   }
//   return finalResult;
//   */
//   // errors.verificationCode = `Unable to verify code. status: ${verificationResult.status}`;
//   // return res.render('verify', { title: 'Verify', user: req.user, errors });
// }




// /**
//  * @summary Send a verification Email OTP to user's email
//  * @param email
//  * @returns response
//  *
//  * @author Girish Pawar
//  **/
// async function sendEmailVerificationOTP(email) {
//   let finalResult = {};
//   return new Promise((resolve, reject) => {
//     twilioClient.verify.services(verificationSid)
//                 .verifications
//                 .create({to: email, channel: 'email'},
//       function (err, response) {
//         if (err) {
//           finalResult = {
//             status: err.code,
//             message: "Please provide correct OTP.",
//             success: false
//           }; 
//           resolve(finalResult);
//         }
//         try {
//           finalResult = {
//             status: 200,
//             success: true,
//             data : response
//           };
//           resolve(finalResult);
//         } catch (err) {
//           finalResult = {
//             status: 501,
//             message: "Having issue with OTP verification",
//             success: false
//           }; 
//           reject(finalResult);
//         }
//       });
//   });
// }

// /**
//  * @summary Verify Email otp for user
//  * @param email, otp
//  * @returns response
//  *
//  * @author Girish Pawar
//  **/
// async function checkVerificationEmailOTP(user) {
//   return new Promise((resolve, reject) => {
//     twilioClient._verify.services(verificationSid)
//       .verificationChecks
//       .create({ to:user.email, code: user.otp }, function (err, response) {
//         if (err) {
//           console.log("Error is:",err);
//           finalResult = {
//             status: 401,
//             message: err,
//             success: true
//           }; 
//           resolve(finalResult);
//         }
//         try {
//           finalResult = {
//             status: 200,
//             message: err,
//             success: true,
//             data : response
//           };
//           resolve(finalResult);
//         } catch (err) {
//           finalResult = {
//             status: 501,
//             message: err,
//             success: false
//           }; 
//           reject(finalResult);
//         }
//       });
//   });
// }

// /**
//  * @summary Generate Token for authorized user
//  * @param -
//  * @returns token
//  *
//  * @author Girish Pawar
//  **/
// function generateToken(user, role,roleType=null) {
//   //console.log("In generateToken function user is:",user);
//   // PAYLOAD 
//   var payload = {
//     id: user.user_id,
//     first_name: user.first_name,
//     last_name: user.last_name,
//     role: role,
//   };
//   if(roleType != null)
//     payload.person_type = roleType;

//   return (token = jwt.sign(payload, constants.secret, {  expiresIn: 86400 * 365, }));     // 1 Day in seconds (1 week = 604800)
// }

// /**
//  * @summary Get the Auto Increment ID of specified table name
//  * @param autoincrmentid
//  * @returns callback
//  *
//  * @author Girish Pawar
//  *
//  **/

// function getAutoIncrementID(tablename) 
// {
//   getConnection(function (err, con) {
//     var userQuery = "SHOW TABLE STATUS LIKE '"+tablename+"' ";   //SHOW TABLE STATUS FROM up_users LIKE AUTO_INCREMENT";
//     console.log("user query is : " + userQuery); //displays undefined
//     con.query(userQuery,function(err,result){
//       console.log("Result is:",result[0].Auto_increment);
//       return result[0].Auto_increment;
//       con.release();
//     })
//   })
// }






// /* Old Fuctions */

// function registerTwilioUser(user) {
//   // Register this user if it's a new user
//   if (!user.authyId) {
//     return new Promise((resolve, reject) => {
//       authy.register_user(user.email, user.phone, user.countryCode, function (
//         err,
//         response
//       ) {
//         if (err) {
//           //reject(err)
//           console.log("err1 : ", err);
//           resolve(err);
//           return;
//         }
//         try {
//           user.authyId = response.user.id;
//           resolve(response);
//         } catch (err) {
//           reject(err);
//         }
//       });
//     });
//   }
// }

// /**
//  * @summary CallBack function to show error
//  * @param err
//  * @returns string
//  *
//  * @author Girish Pawar
//  **/
// function callBackFun(err) {
//   if (err) {
//     return "There was a problem sending your token";
//   }
// }

// /**
//  * @summary Send a verification token to this user
//  * @param user, callbackfunction
//  * @returns callback
//  *
//  * @author Girish Pawar
//  **/
// async function sendAuthySMS(authyId, callBack) {
//   /*
//   authy.request_sms(authyId, true, function (err, response) 
//   {
//     //console.log(err, response);
  
//       return callBack.call(err, response);
//       //return response;
//   }); */

//   // With a valid Authy ID, send the 2FA token for this user
//   return new Promise((resolve, reject) => {
//     authy.request_sms(authyId, true, function (err, response) {
//       if (err) {
//         //reject(err)
//         console.log("err2 : ", err);
//         resolve(err);
//         return;
//       }
//       try {
//         resolve(response);
//       } catch (err) {
//         reject(err);
//       }
//     });
//   });
// }

// /**
//  * @summary Verifiy otp for user
//  * @param user, otp, callbackfunction
//  * @returns callback
//  *
//  * @author Girish Pawar
//  * @revierer Girish Pawar
//  **/
// async function verifyAuthyToken(authyId, otp) {
//   // authy.verify(user.authyId, otp, function(err, response) {
//   //     return callBack.call(user, err, response);
//   // });
//   return new Promise((resolve, reject) => {
//     authy.verify(authyId, otp, function (err, response) {
//       if (err) {
//         //console.log("Error is:",err);
//         resolve(err);
//         //reject(err)
//         return;
//       }
//       try {
//         //console.log("success is:",response);
//         resolve(response);
//       } catch (err) {
//         reject(err);
//       }
//     });
//   });
// }

// /**
//  * @summary Checks the device into existing deviceList
//  * @param customer
//  * @returns boolean value (true/false)
//  *
//  * @author Girish Pawar
//  **/
// function checkDevice(customer) {
//   var isExist = false;
//   var isUpdateDeviceDetails = false;
//   var matchingDevice = {};
//   var matchingIndex = 0;
//   for (var index in user.deviceDetails) {
//     console.log(
//       "dbobj",
//       user.deviceDetails[index].deviceId,
//       "reqobj",
//       req.body.deviceId
//     );
//     if (
//       user.deviceDetails[index].deviceId === req.body.deviceId &&
//       user.deviceDetails[index].isVerified == false
//     ) {
//       isExist = true;
//       // matchingIndex = index
//       // matchingDevice = user.deviceDetails[index]
//       // isUpdateDeviceDetails = true
//       // break
//     } else if (
//       user.deviceDetails[index].deviceId === req.body.deviceId &&
//       user.deviceDetails[index].isVerified == true
//     ) {
//       isExist = true;
//       // matchingIndex = index
//       // matchingDevice = user.deviceDetails[index]
//       // isUpdateDeviceDetails = false
//       // break
//     }
//   }
// }

// /**
//  * @summary Checkes the order total
//  * @param order
//  * @returns boolean value (true/false)
//  *
//  * @author Girish Pawar
//  **/
// function checkOrderTotal(order) {
//   let tempTax = +process.env.VATCHARGES * (order.orderSubTotal / 100);
//   let tempRetailFees = +process.env.RETAILFEES * (order.orderSubTotal / 100);
//   let tempTotal =
//     order.orderSubTotal +
//     tempTax +
//     tempRetailFees -
//     order.orderDiscount +
//     order.orderDeliveryCharges;

//   // console.log("tax =>",+process.env.VATCHARGES, tempTax, "retail fee =>", tempRetailFees, "actual", tempTotal, "tota", order.orderTotal)
//   if (tempTotal == order.orderTotal) {
//     return true;
//   } else {
//     return false;
//   }
// }

// /**
//  * @summary Checkes the order Discount
//  * @param order
//  * @returns boolean value (true/false)
//  *
//  * @author Girish Pawar
//  **/
// function checkOrderDiscount(order) {
//   let tempOfferCode = order.offerCode;
//   let tempOrderDiscount = +process.env.RETAILFEES * (order.orderSubTotal / 100);

//   if (tempOrderDiscount == order.orderDiscount) {
//     return true;
//   } else {
//     return false;
//   }
// }

// /**
//  * @summary Checkes the order Item total
//  * @param orderItem
//  * @returns boolean value (true/false)
//  *
//  * @author Girish Pawar
//  **/
// function checkOrderItemTotal(orderItem) {
//   let tempTax = +process.env.VATCHARGES * (orderItem.subTotal / 100);
//   let tempRetailFees = +process.env.RETAILFEES * (orderItem.subTotal / 100);
//   let tempTotal = orderItem.subTotal + tempTax + tempRetailFees;

//   console.log(
//     "tax =>",
//     tempTax,
//     "retail fee =>",
//     tempRetailFees,
//     "actual",
//     tempTotal,
//     "total",
//     orderItem.total
//   );
//   if (tempTotal == orderItem.total) {
//     return true;
//   } else {
//     return false;
//   }
// }

// /**
//  * @summary generates the OrderId for new order
//  * @param -
//  * @returns OrderId
//  *
//  * @author Girish Pawar
//  **/
// function generateOrderId() {
//   function random(qty) {
//     return crypto.randomBytes(qty);
//   }
//   return "ORD0" + format(random(5), "dec");
// }

// /**
//  * @summary Verify User Roles for Authrization Purpose
//  * @param -
//  * @returns True/False
//  *
//  * @author Girish Pawar
//  **/
// function verifyUserRoles(expectedRole, userRole) {
//   if (expectedRole === userRole) {
//     return true;
//   }
//   return false;
// }

// function createS3bucket() {
//   const params = {
//     Bucket: BUCKET_NAME,
//     CreateBucketConfiguration: {
//       // Set your region here
//       LocationConstraint: REGION,
//     },
//   };

//   s3.createBucket(params, function (err, data) {
//     if (err) {
//       console.log(err, err.stack);
//       return false;
//     } else {
//       console.log("Bucket Created Successfully", data.Location);
//       return data.Location;
//     }
//   });
// }

// /**
//  * @summary Upload Object to S3 bucket
//  * @param - base64String , filepath
//  * @returns image URL
//  * @author Girish Pawar
//  **/
// async function uploadObjectS3(base64File, filePath) {
//   const mimeInfo = this.base64MimeType(base64File);
//   var fileTypeStatus = this.allowedFiletypes(mimeInfo);
//   var contentType = fileTypeStatus.mimetype;

//   // Read content from the file
//   //const fileContent = fs.readFileSync(filBlob);
//   //fs.unlinkSync(req.file.path); // Empty temp folder

//   //const fileContent1 = new Buffer.from(base64File,'base64');     //.replace(/^data:image\/\w+;base64,/, "")
//   const fileContent1 = new Buffer.from(
//     base64File.replace(/^data:image\/\w+;base64,/, ""),
//     "base64"
//   );

//   if (fileTypeStatus != false) {

//     /// got valid filetype of uploaded file
//     var ext = fileTypeStatus.filetype;
//     var newname = ObjectId();
//     var filename = `${filePath}${newname}.${ext}`;
//     //console.log("filepath:",filename);

//     // Setting up S3 upload parameters
//     const params = {
//       Bucket: BUCKET_NAME,
//       Key: filename, ///'cat.jpg', // File name you want to save as in S3
//       Body: fileContent1,
//       ContentEncoding: "base64",
//       ContentType: contentType,
//       ACL: "public-read",
//     };

//   return new Promise((resolve, reject) => {
    
//     // Uploading files to the bucket
//     s3.upload(params, function (err, data) {
//         if (err) {
//           console.log("In throw err line 553");
//           reject(err);
//           return false;
//           //throw err;
//         }
//         console.log(`File uploaded successfully. ${data.Location}`);
//         resolve(data.Location);
//       });
//     });
//   }else{
//     return false;
//   }
// }


// async function uploadObjectS3__OLD(base64File, filePath) {
//   const mimeInfo = this.base64MimeType(base64File);
//   var fileTypeStatus = this.allowedFiletypes(mimeInfo);

//   var contentType = fileTypeStatus.mimetype;

//   // Read content from the file
//   //const fileContent = fs.readFileSync(filBlob);

//   //const fileContent1 = new Buffer.from(base64File,'base64');     //.replace(/^data:image\/\w+;base64,/, "")
//   const fileContent1 = new Buffer.from(
//     base64File.replace(/^data:image\/\w+;base64,/, ""),
//     "base64"
//   );

//   if (fileTypeStatus != false) {
//     /// got valid filetype of uploaded file
//     var ext = fileTypeStatus.filetype;
//     var newname = ObjectId();
//     var filename = `${filePath}${newname}.${ext}`;
//     //console.log("filepath:",filename);

//     // Setting up S3 upload parameters
//     const params = {
//       Bucket: BUCKET_NAME,
//       Key: filename, ///'cat.jpg', // File name you want to save as in S3
//       Body: fileContent1,
//       ContentEncoding: "base64",
//       ContentType: contentType,
//       ACL: "public-read",
//     };

//     // Uploading files to the bucket
//    await s3.upload(params, function (err, data) {
//       if (err) {
//         console.log("In throw err line 553");
//         throw err;
//       }
//       console.log(`File uploaded successfully. ${data.Location}`);
//       return data.Location;
//     });
//   }
// }

// /**
//  * @summary Code for converting contact json into required json or mapping keys from phone array to actual keys needed in DB
//  * @param - inputJson p- provided from Mobile Client 
//  * @returns contact json
//  * @author Shoeb
//  **/
// async function contactJson(inputJson) {
//   let tempArray = [];
//   tempArray.push(inputJson)
//   let requiredJson = {};

//   for(var i = 0; i < tempArray.length; i++) {
//     var obj = tempArray[i];

//     /* Parse Mobile Number in Exact Format like remove spaces , country codes , and symbols from input string */
//     var mobileNumber = obj.phoneNumbers[0].number;

//     //console.log("mobileNumber is:",mobileNumber);
//     // Parse number with country code and keep raw input.
//     //const number = phoneUtil.parse(mobileNumber);

//     //console.log("mobileNumber is valid or not "+mobileNumber+" :", number.getCountryCode()," and region is :",phoneUtil.getRegionCodeForNumber(number));   
//     // phoneUtil.isValidNumber(phoneUtil.parse(mobileNumber))     phoneUtil.getNumberType(number)

//     //// Check whether mobile number is Toll Free or Company Provided numbers
//     var removedSpacesNumber = mobileNumber.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
//     var actualMobile = removedSpacesNumber.split(" ").join(""); 

//     console.log(actualMobile+" actualMobile.length is:",actualMobile.length);
//     if(actualMobile.length > 5)
//     { 
//       requiredJson.mobile_no_with_country_code = actualMobile;
//       requiredJson.thumbnail = obj.thumbnail;

//       /* Map name Fields values to from input to required fields */
//       var nameString; 
//       if (obj.displayName != '') {
//         nameString = obj.displayName;
//       } else {
//         nameString = obj.givenName;
//       }
//       // Function to split string 
//       var resultString = nameString.split(" "); 
//       //console.log("result string is:",resultString[0]);
//       requiredJson.first_name = resultString[0];
//       requiredJson.last_name = resultString[1];
//       requiredJson.full_name = resultString[0]+' '+resultString[1];
//       /* End Name Assigning Utility */  

//     }
//     //requiredJson.mobile_no_with_country_code = (requiredJson.mobile_no_with_country_code).replace(/\s+\s/gi, ' ').trim();
//     //console.log("mobile_no_with_country_code is:",requiredJson.mobile_no_with_country_code);
//   }
//   //console.log(requiredJson);
//   return requiredJson;
// }

// /**
//  * @summary Get the Day Value
//  * @param - inputDay => Monday etc
//  * @returns NumberOfDay => 1
//  * @author Girish Pawar
//  **/
// async function getdayNumber(dayName) {
//   var numberOfday = '';
//   if(dayName == 'Monday')
//     numberOfday = 0;
  
//   if(dayName == 'Tuesday')
//     numberOfday = 1;
  
//   if(dayName == 'Wednesday')
//     numberOfday = 2;
  
//   if(dayName == 'Thursday')
//     numberOfday = 3;

//   if(dayName == 'Friday')
//     numberOfday = 4;
  
//   if(dayName == 'Saturday')
//     numberOfday = 5;
  
//   if(dayName == 'Sunday')
//     numberOfday = 6;

//   return numberOfday;
// }

// exports.helpers = {
//   randomValueHex: randomValueHex,
//   toTitleCase: toTitleCase,
//   printObject: printObject,
//   base64MimeType: base64MimeType,
//   allowedFiletypes: allowedFiletypes,
//   uploadBase64intoFile: uploadBase64intoFile,

//   sendOTP: sendOTP,
//   checkDevice: checkDevice,

//   registerTwilioUser: registerTwilioUser,
//   sendAuthySMS: sendAuthySMS,
//   verifyAuthyToken: verifyAuthyToken,
//   callBackFun: callBackFun,

//   sendVerificationOTP : sendVerificationOTP,
//   checkVerificationOTP : checkVerificationOTP,
//   sendEmailVerificationOTP : sendEmailVerificationOTP,
//   checkVerificationEmailOTP : checkVerificationEmailOTP,
//   getAutoIncrementID : getAutoIncrementID,

//   checkOrderTotal: checkOrderTotal,
//   checkOrderItemTotal: checkOrderItemTotal,
//   generateOrderId: generateOrderId,

//   verifyUserRoles: verifyUserRoles,
//   generateToken: generateToken,

//   createS3bucket: createS3bucket,
//   uploadObjectS3: uploadObjectS3,

//   contactJson:contactJson,
//   getdayNumber : getdayNumber

// };
