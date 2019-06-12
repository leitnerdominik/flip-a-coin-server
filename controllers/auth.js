const User = require('../models/user');

exports.createUser = async (req, res, next) => {
  const user = new User();
  const result = await user.save();

  const tenYears = 1000 * 60 * 60 * 24 * 365 * 10;
  res.cookie('userId', result._id, {
    expires: new Date(Date.now() + tenYears),
    httpOnly: true,
  });
  return res.send('cookie set');
};
