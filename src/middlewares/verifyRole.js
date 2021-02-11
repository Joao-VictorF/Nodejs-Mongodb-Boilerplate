const Admin = require('@models/admin');

exports.isAdmin = async function (req, res, next) {
  const accessToken = req.headers['x-access-token'];

  const admin = await Admin.findOne({ accessToken });

  if (!admin) {
    return res.status(401).json({
      success: false,
      message: 'You do not have permission to access this feature.',
    });
  }

  next();
};
