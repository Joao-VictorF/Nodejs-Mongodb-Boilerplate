const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');

let userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name not provided.'],
  },
  whatsapp: {
    type: String,
  },
  photo: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, 'Email not informed.'],
    validate: {
      validator: async email => {
        return isEmail(email);
      },
      message: 'Invalid email.',
    },
  },
  password: {
    type: String,
  },
  firstAccess: {
    type: Boolean,
    default: false,
  },
  accessToken: {
    type: String,
  },
});

userSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

userSchema.plugin(uniqueValidator, {
  message: 'There is already a registered user with this email.',
});

module.exports = mongoose.model('User', userSchema);
