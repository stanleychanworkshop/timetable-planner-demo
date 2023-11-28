/**
 * Middleware: functions that have access to the request object (req) and response object (res)
 * and the next function in the application's request-response cycle
 * 
 * Middleware functions can perform the following tasks:
 * - Execute any code
 * - Make changes to the request and response objects
 * - End the request-response cycle
 * - Call the next middleware in the stack
 **/

 const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

module.exports = logger;