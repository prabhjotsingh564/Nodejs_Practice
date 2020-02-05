const JWT = require('jsonwebtoken');
const FUNCTION = require('../../function');

module.exports = VerifyAuthentication = (req, res, next) => {
    if(req.headers.authorization){     
     let token = req.headers.authorization.split(' ');
     token = token[1];
     JWT.verify(token, 'Welcome to Nugen', function (err, decodedInfo) {
         if (err) {
             const data={
                 status:422,
                 msg:" ",
                 error:err.message
             }
             FUNCTION.error(data,res);
         } else {
             req.body.decodedInfo = decodedInfo;
             next();
         }
     })
    }else{
        const data ={
            status:422,
            msg:" ",
            error:"Authorization token is required"
        }
     FUNCTION.error(data,res);
    }
 };