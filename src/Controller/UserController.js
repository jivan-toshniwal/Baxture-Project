const mongoose = require('mongoose');
const User = require('../Modal/UserModel');
const uuid = require('uuid');

exports.createUser = async (req, res, next) => {
  const userData = req.body.users;
  // Generate a UUID for each user in the array
  const usersWithId = userData.map((user) => ({ ...user, id: uuid.v4() }));
  const users = await User.create(usersWithId);

  res.status(201).json({
    status: true,
    message: 'User created successfully',
    result: `${users.length} users`,
    users,
  });
};

exports.getUsers = async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: true,
    message: 'get users',
    results: users.length,
    users,
  });
};

exports.getUserById = async (req, res, next) => {
  const id = req.params.id;

  let user;

  // Check if the provided id is a valid mongoose ObjectId
  if (mongoose.Types.ObjectId.isValid(id)) {
    // If valid, find by _id (mongoose ObjectId)
    user = await User.findOne({ _id: id });
  } else {
    // If not valid, find by custom id
    user = await User.findOne({ id });
  }

  if (!user) {
    return res.status(404).json({
      status: false,
      message: `User not found with id ${id}`,
    });
  }

  res.status(200).json({
    status: true,
    message: 'User found',
    user,
  });
};

exports.updateUserById = async (req, res, next) => {
  const id = req.params.id;
  const { updateFields } = req.body;

  let user;

  // Check if the provided id is a valid mongoose ObjectId
  if (mongoose.Types.ObjectId.isValid(id)) {
    // If valid, update by _id (mongoose ObjectId)
    user = await User.findOneAndUpdate(
      { _id: id },
      { $set: updateFields },
      { runValidators: true, new: true }
    );
  } else {
    // If not valid, update by custom id
    user = await User.findOneAndUpdate(
      { id },
      { $set: updateFields },
      { runValidators: true, new: true }
    );
  }

  if (!user) {
    return res.status(404).json({
      status: false,
      message: 'User not found.',
    });
  }

  res.status(200).json({
    status: true,
    message: 'User updated successfully',
    user,
  });
};

exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;

  let user;

  // Check if the provided id is a valid mongoose ObjectId
  if (mongoose.Types.ObjectId.isValid(id)) {
    // If valid, update by _id (mongoose ObjectId)
    user = await User.findOneAndUpdate(
      { _id: id },
      { $set: { isDeleted: true } },
      { new: true }
    );
  } else {
    // If not valid, update by custom id
    user = await User.findOneAndUpdate(
      { id },
      { $set: { isDeleted: true } },
      { new: true }
    );
  }

  if (!user) {
    return res.status(404).json({
      status: false,
      message: 'User not found.',
    });
  }

  res.status(200).json({
    status: true,
    message: 'Deletion success!',
  });
};
