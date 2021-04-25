# Backend_Up4Cofee_Nodejs
Creating API in Node Express Framework for Up4Cofee API Project

For checking API, install Postman App on your local machine from as per your OS :
https://www.getpostman.com/downloads/

Postman Collection stored at "Schema/InterviewAPI.postman_collection.json"

Once Downloaded and installed Postman on your machine. Follow instructions from below link : 
https://kb.datamotion.com/?ht_kb=postman-instructions-for-exporting-and-importing

Once you imported API Collection. You will have access to our API, will all request and response parameters.

# Programming Envirnment details below :

Editor - VScode
Node JS - v10.19.0
Mysql - v8.0

## VSCode required Extentions : 

### 1. vscode-comment
Adds simple jsdoc comments for the parameters of a selected function signature

Using
In a typescript or javascript file, select a function signature, ideally one that contains one or more parameters. Select the whole function signature then invoke the Add Doc Comments extension (open the command palette (F1 on Windows) and look for the command 'Add doc comments'. Hit enter.)

The extension will parse the selected signature and add @param and @return tags for each parameter and any return type in the selected signature, directly above the signature.

2. Markdown All in One 

Keyboard Shortcuts
Table
Key	Command
Ctrl/Cmd + B	Toggle bold
Ctrl/Cmd + I	Toggle italic
Ctrl/Cmd + Shift + ]	Toggle heading (uplevel)
Ctrl/Cmd + Shift + [	Toggle heading (downlevel)
Ctrl/Cmd + M	Toggle math environment
Alt + C	Check/Uncheck task list item
Ctrl/Cmd + Shift + V	Toggle preview
Ctrl/Cmd + K V	Toggle preview to side

# Validator Layer :

https://github.com/validatorjs/validator.js

# Sequelize Mysql IMP Links : 

https://sequelize.org/master/manual/migrations.html



# File Uploading Referemces : 

https://medium.com/@otoloye/uploading-files-to-aws-s3-using-nodejs-multer-mongodb-and-postman-part-1-de790b8131d4

https://intellipaat.com/community/15243/uploading-base64-encoded-image-to-amazon-s3-via-node-js

https://stackoverflow.com/questions/40494050/uploading-image-to-amazon-s3-using-multer-s3-nodejs

https://www.npmjs.com/package/multer-s3

# Get the AWS Account Credentials :

Login into AWS account and open below link to view AWS keys :
https://console.aws.amazon.com/iam/home?region=ap-south-1#/security_credentials

Check "Access keys (access key ID and secret access key)" section and you will see something like below :

if you don't see any then create new one by clicking on button "Create New Access Key"

Then you can see one popup with credentials there : 

Access Key ID: AKIAxxxxxxxxxxxxx4A
Secret Access Key: OUTFALxxxxxxxxxxxxxxxxxxPcLi

# Base64 String generator from file :

https://www.base64-image.de

# Twillio Verify API References : 

https://github.com/TwilioDevEd/verify-v2-quickstart-node/blob/next/routes/verify.js

https://www.twilio.com/docs/verify/api/v1/quickstart/nodejs

https://www.twilio.com/docs/verify/quickstarts/node-express


https://www.twilio.com/docs/verify/api

https://www.twilio.com/docs/verify/email

https://www.twilio.com/docs/verify/api/customization-options

https://www.twilio.com/docs/verify/email?code-sample=code-check-an-email-verification&code-language=Node.js&code-sdk-version=3.x

https://www.twilio.com/docs/sms/quickstart/node#sign-up-for-twilio-and-get-a-twilio-phone-number


# Twillio Free Account Terms : 

https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account

# Preventing Fraud on Twillio Service :

https://www.twilio.com/docs/verify/preventing-toll-fraud

# Node Excel JS library for Reporting purpose

https://www.npmjs.com/package/exceljs 

# If getting error while connecting to mysql bu using mysql npm package then follow below commands to achive connection suvvessfully

https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server

https://chartio.com/resources/tutorials/how-to-grant-all-privileges-on-a-database-in-mysql/

create user nodeuser@localhost identified by 'Nodeuser@1234';
grant all privileges on *.* to nodeuser@localhost;
ALTER USER 'nodeuser'@localhost IDENTIFIED WITH mysql_native_password BY 'Nodeuser@1234';
FLUSH PRIVILEGES;

https://fearby.com/article/how-to-setup-pooled-mysql-connections-in-node-js-that-dont-disconnect/

for avoiding below error on mysql server : 

error result: Error: ER_WRONG_FIELD_WITH_GROUP: Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column

SOlution :
https://dba.stackexchange.com/questions/237048/1055-expression-1-of-select-list-is-not-in-group-by-clause-and-contains-nonag

https://stackoverflow.com/questions/41887460/select-list-is-not-in-group-by-clause-and-contains-nonaggregated-column-inc


Below method solved my problem:

In ubuntu

Type: sudo vi /etc/mysql/my.cnf

type A to enter insert mode

In the last line paste below two line code:

[mysqld]
sql_mode = STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION

Type esc to exit input mode

Type :wq to save and close vim.

Type sudo service mysql restart to restart MySQL.

OR 

Open Phpmyadmin -> Mysql -> hit below query :

SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

OR 

mysql -u root -p
mysql > SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

# Get nearby users in specific km radius from MYSQL using query 

https://stackoverflow.com/questions/10621345/search-database-with-lat-and-long-by-radius-using-php-mysql

## Mysql using Sequelize : 

https://www.movable-type.co.uk/scripts/latlong-db.html

https://stackoverflow.com/questions/44675630/geospatial-distance-calculator-using-sequelize-mysql/46028420

https://stackoverflow.com/questions/44012932/sequelize-geospatial-query-find-n-closest-points-to-a-location


## Sequelize Pagination : 

https://github.com/eclass/sequelize-paginate



# Logging Technique implementaed using winston : 

https://levelup.gitconnected.com/creating-a-custom-logger-for-node-js-application-using-winston-3925007c9659

Added Below 2 Methods for printing logs into file on daily basis :

logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

logger.info(` ${req.originalUrl} - ${req.method} -` , req.body);


# Maps Billing Reference : 

https://cloud.google.com/maps-platform/pricing/#matrix

# NPM Packages

### Backend frameworks
- express

### Databases-related
- mongoose - ODM library for MongoDB
- sequelize - ORM library for MySQL, PostgreSQL, MariaDB, SQLite, MS SQL

### WebSockets
- socket.io - WebSocket server & client library
- ws - WebSocket server & client library
- uWebSocket - WebSocket server library

### Express middlewares
- body-parser - express middleware for request body parsing
- helmet - express middleware for enabling secure headers and disabling unsecure
- compression - data compression middleware
- passport - flexible and customizable authentification middleware

### Authorization & Authentication
- passport - flexible and customizable authentification middleware
- jwt - library for creation of JSONWebTokens (session tokens)
- bcryptjs - library for hashes creation and comparison

### Input validation
- node-validator
- express-validator

### Logging
- morgan
- log4js

### Unit tests related
- mocha - test runner framework
- chai - assertion library
- shouldjs - assertion library
- supertest-promised - library for testing http requests

### HTTP requests
- request
- axios

### Cron-jobs
- node-schedule
- agenda & agenda-ui

### Utility libraries
- lodash
- underscore
- rambda
- bluebird - "Promises on anabolics" library
- biguint-format - An arbitrary length unsigned integer formatter library for Node.js.

### Files parsing
- csv-parser

### Date parsing
- moment

### Code coverage & code style
- eslint - configurable linting library
- istanbul - code coverage library

### E-Commerce
- stripe
- braintree

### Emails
- nodemailer - library for sending emails

### DOM imitation
- cheerio
- jsdom

### Live-Reload
- nodemon

### Task runners
- gulp
- grunt

### Other cool stuff
- chalk, colors - simple library for making colorful console output
- forever - CLI tool for running node.js server script "forever"
- gm - library for images manipulation
- slug - unicode aliasing library
- pdfkit - library for PDF files creation


# Folder Structure

      src
      │   index.js        # App entry point.
      └───api             # Express route controllers for all the endpoints of the app.
      └───config          # Environment variables and configuration related stuff.
      └───helpers         # Helper functions related to log, error and etc. 
      └───loaders         # Split the startup process into modules.
      └───models          # Database models.
      └───controllers     # All the business logic is here.
      └───uploads         # Uploading all media files.
      └───enums           # Set of Master Objects for checking different status.
      └───test            # Unit test cases for different functions.
      
      └───config          # Contains config file, which tells CLI how to connect with database
      └───models          # Contains all models for your project
      └───migrations      # Contains all migration files
      └───seeders         # Contains all seed files

# Enums

  An Enum or enumeration is a variable data type consisting of a set of named values called elements or enumerators of the type. The enumerator names are usually identifiers that behave as constants in the language. A variable that has been declared as having an enumerated type can be assigned any of the enumerators as a value. In other words, an enumerated type has values that are different from each other, and that can be compared and assigned, but are not specified by the programmer as having any particular concrete representation in the computer's memory; compilers and interpreters can represent them arbitrarily.
  
  We have used folllwing Enum types in this project.
    a. MODEL_STATUS
    b. ORDER_STATUS
    c. PAYMENT_STATUS
    d. USER_ROLE

 a. MODEL_STATUS
    It is used to show the different status of the module record. Active, Inactive, Archive, Trashed values are used.

 b. ORDER_STATUS
    It us used to show the diiferent order status like wating for approval, approved, cancelled etc.

 c. PAYMENT_STATUS
    It is used for payment status. Pending and completed status are used in this project.

 d. USER_ROLE
    This enum used to show different types of user like Admin, super Admin, Customer etc.
