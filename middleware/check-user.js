const User = require('../models/user');

module.exports = async (req, res, next) => {
  const { userId } = req.cookies;

  if (!userId) {
    next();
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      next();
    }
    return res.status(200).json({ message: 'User found!'});
  } catch (err) {
    console.log(err);
    next(new Error(err));
  }
};
