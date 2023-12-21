const alphabeticRegex = /^[A-Za-z\s]+$/;

exports.validateFields = (req, res, next) => {
  const { updateFields } = req.body;

  for (const key in updateFields) {
    if (!['username', 'age', 'hobbies'].includes(key)) {
      return res.status(400).json({
        status: false,
        message: `Bad request!! field ${key} is not a valid field to update!!`,
      });
    }
    if (key === 'hobbies' && !Array.isArray(updateFields[key])) {
      return res.status(400).json({
        status: false,
        message: `Bad request!! Please send hobbies in array of string!!`,
      });
    }

    if (key === 'age' && typeof updateFields[key] !== 'number') {
      return res.status(400).json({
        status: false,
        message: `Bad request!! field ${key} should be a number!!`,
      });
    }

    if (key === 'username' && !alphabeticRegex.test(updateFields[key])) {
      return res.status(400).json({
        status: false,
        message: `Bad request!! field ${key} allowed only alphabets!!`,
      });
    }
  }
  next();
};
