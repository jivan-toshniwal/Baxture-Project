const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username.'],
    trim: true,
    minlength: [3, 'Username must be at least 3 characters.'],
    maxlength: [15, 'Username cannot exceed 15 characters.'],
  },
  age: {
    type: Number,
    required: [true, 'Please provide an age.'],
    min: [0, 'Age must be a non-negative number.'],
  },
  hobbies: {
    type: [String],
    default: [],
    validate: {
      validator: (hobbies) => {
        return (
          Array.isArray(hobbies) &&
          hobbies.every((hobby) => typeof hobby === 'string')
        );
      },
      message: 'Hobbies must be an array of strings.',
    },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
