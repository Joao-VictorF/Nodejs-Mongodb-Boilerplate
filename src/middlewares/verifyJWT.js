require("dotenv-safe").config();
var jwt = require('jsonwebtoken');


exports.verifyJWT =  function(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token)return res.status(401).json({ success: false, message: 'No tokens were entered.' });
  
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Error while authenticating the token. Log in again.' });
    next();
  });
}