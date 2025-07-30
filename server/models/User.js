import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: [true, "Email already exists"],
  },
  password: {
    // not required for oauth users
    type: String,
    select: false,
    minlength: [6, "Password must be at least 6 characters long"],
  },
  authProvider: {
    type: String,
    enum: ['local', 'google'],
    required: true,
    default: 'local'
  },
  credits: {
    type: Number,
    required: true,
    default: 3, // free credits for new users
    min: 0,
  }
})

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
}

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id }, 
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_LIFETIME }
  );
}

export default mongoose.model('User', UserSchema)
