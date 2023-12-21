const mongoose = require('mongoose');
const { Schema } = mongoose;
const uuid = require('uuid');

const alphabeticRegex = /^[A-Za-z\s]+$/;

const userSchema = new Schema(
  {
    id: {
      type: String,
      default: uuid.v4,
      unique: true,
      required: true,
    },
    username: {
      type: String,
      required: [true, 'Please provide a username.'],
      validate: {
        validator: (username) => {
          return alphabeticRegex.test(username);
        },
        message: 'firstname allowed only alphabets',
      },
      trim: true,
      minlength: [3, 'Username must be at least 3 characters.'],
      maxlength: [15, 'Username cannot exceed 15 characters.'],
    },
    age: {
      type: Number,
      required: [true, 'Please provide an age.'],
      validate: {
        validator: (age) => Number.isInteger(age),
        message: 'Age must be an integer.',
      },
      min: [0, 'Age must be a non-negative number.'],
    },
    hobbies: {
      type: Array,
      required: true,
      validate: {
        validator: function (array) {
          return array.every((v) => typeof v === 'string');
        },
        message: 'Hobbies must be an array of string!!',
      },
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Query middleware to exclude deleted documents starting with find
userSchema.pre(/^find/, function (next) {
  this.find({ isDeleted: false });
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
