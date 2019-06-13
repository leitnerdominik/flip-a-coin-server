const User = require('../models/user');

module.exports = async (req, res, next) => {
  const { userId } = req.cookies;
  console.log('Cookies: ', userId);

  if (!userId) {
    return next();
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return next();
    }
    return res.status(200).json({ message: 'User found!' });
  } catch (err) {
    console.log(err);
    next(new Error(err));
  }
};