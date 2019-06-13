const Stats = require('../models/stats');
const User = require('../models/user');

exports.getStats = async (req, res, next) => {
  try {
    const stats = await Stats.findOne();
    if (!stats) {
      const error = new Error('Fetching failed!');
      error.statusCode = 500;
      throw error;
    }

    res.status(200).json({
      message: 'Fetching stats successfully!',
      stats: {
        tails: stats.tails,
        heads: stats.heads,
      },
    });
  } catch (err) {
    console.log(err);
    next(new Error(err));
  }
};

exports.getUserstats = async (req, res, next) => {
  const { userId } = req.cookies;

  try {
    if (!userId) {
      throw new Error('User not found!');
    }
    const user = await User.findById(userId);
    res.status(200).json({
      message: 'User found!',
      user: {
        heads: user.heads,
        tails: user.tails,
        lastflips: user.lastflips,
      },
    });
  } catch (err) {
    console.log(err);
    next(new Error(err));
  }
};

exports.addTails = async (req, res, next) => {
  try {
    const stats = await Stats.findOne();
    if (!stats) {
      const error = new Error('Fetching failed!');
      error.statusCode = 500;
      throw error;
    }
    const currentTails = stats.tails;
    stats.tails = currentTails + 1;
    await stats.save();
    res.status(200).json({ message: 'Tails updated!' });
  } catch (err) {
    console.log(err);
    next(new Error(err));
  }
};

exports.addHeads = async (req, res, next) => {
  try {
    const stats = await Stats.findOne();
    if (!stats) {
      const error = new Error('Fetching failed!');
      error.statusCode = 500;
      throw error;
    }
    const currentHeads = stats.heads;
    stats.heads = currentHeads + 1;
    await stats.save();
    res.status(200).json({ message: 'Heads updated!' });
  } catch (err) {
    console.log(err);
    next(new Error(err));
  }
};

exports.addUserTails = async (req, res, next) => {
  try {
    const { userId } = req.cookies;
    
    if (!userId) {
      throw new Error('User not found!');
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found!');
    }

    const currentTails = user.tails;
    user.tails = currentTails + 1;
    if (user.lastflips.length >= 5) {
      user.lastflips.shift();
    }
    user.lastflips.push('tails');
    await user.save();
    res.status(200).json({ message: 'User stats updated!' });
  } catch (err) {
    console.log(err);
    next(new Error(err));
  }
};

exports.addUserHeads = async (req, res, next) => {
  try {
    const { userId } = req.cookies;
    if (!userId) {
      throw new Error('User not found!');
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found!');
    }

    const currentHeads = user.heads;
    user.heads = currentHeads + 1;
    if (user.lastflips.length >= 5) {
      user.lastflips.shift();
    }
    user.lastflips.push('heads');
    await user.save();
    res.status(200).json({ message: 'User stats updated!' });
  } catch (err) {
    console.log(err);
    next(new Error(err));
  }
};
