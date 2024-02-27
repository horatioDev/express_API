// Importing the moment module for date/time formatting
const moment = require('moment');

// Logger middleware function to log request details
const logger = (req, res, next) => {
  // Logging the request protocol, host, URL, and current timestamp
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} : ${moment().format()}`);
  
  // Calling the next middleware function in the stack
  next();
}

// Exporting the logger middleware function for use in other modules
module.exports = logger;
