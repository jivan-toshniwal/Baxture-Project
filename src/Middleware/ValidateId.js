const mongoose = require('mongoose');
const uuid = require('uuid');

function validateMongooseId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}
function validateUuid(id) {
  return uuid.validate(id);
}

exports.validateId = (req, res, next) => {
  const userId = req.params.id;
  if (!validateMongooseId(userId) && !validateUuid(userId)) {
    return res.status(400).json({
      status: false,
      message: 'Invalid id. Must be a valid mongoose or uuid of user!!',
    });
  }
  next();
};
