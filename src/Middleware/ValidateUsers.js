exports.validateUser = (req, res, next) => {
  const userData = req.body.users;
  if (!userData) {
    return res.status(404).json({
      status: false,
      message: 'Please provide data to add!!',
    });
  }

  if (!Array.isArray(userData)) {
    return res.status(404).json({
      status: false,
      message: 'Please provide data in an array!!',
    });
  }

  if (userData.length === 0) {
    return res.status(404).json({
      status: false,
      message: 'No data found to add!!',
    });
  }

  userData.map((user) => {
    if (user.hobbies && !Array.isArray(user.hobbies)) {
      return res.status(400).json({
        status: false,
        message: 'Please provide hobbies in array of string!',
      });
    }
  });
  next();
};
