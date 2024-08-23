const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String
  },

  lastName: {
    type: String
  },

  name: {
    type: String,
    required: [true, "Please enter your name"]
  },

  email: {
    type: String,
    required: [true, "Please enter your email"],
    validate: [validator.isEmail, "Please enter a valid email"],
    unique: [true, "Email already exists, Please provide another email"],
  },

  phoneNumber: {
    type: String
  },

  password: { 
    type: String,
    required: [true, "Please enter your password"],
    validator: (value) => {
      return validator.isStrongPassword(value, {
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      });
      message: `Password ${value} should contain minimum 1 lowercase, 1 uppercase, 1 number and 1 symbol`
    },
    minLength: [8, "Password should be greater than 8 characters"],
    maxLength: [20, "Password should be less than 20 characters"],
  },

  avatar: {
    type: String,
    default: "https://i.ibb.co/4pDNDk1/avatar.png"
  },

  role: {
    type: String,
    default: "user"
  },

  socialId: {
    type: String,
    unique: [true, "This user already exist."]
  },

  passwordResetToken: String,

  emailConfirmationToken: String,

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt:{
    type: Date,
    default: Date.now
  },

  status: {
    type: String,
    enum:["active", "inactive"],
    default: "active"
  }
  },
  {timestamps: true}
);


// middleware to encrypt password
userSchema.pre("save", async function (next) {
  try{
    //initialize encrypted password
    if (!this.isModified("password")) {
      next();
    }
  
    // hash the password
    this.password = await this.encryptedPassword(this.password);
  }catch(error){
    next(error)
  }
})

userSchema.methods.encryptedPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt)

  return hashedPassword
}

userSchema.methods.comparePassword = async function (password, hash) {
  const isPasswordValid = await bcrypt.compare(password, hash)

  return isPasswordValid  
}

userSchema.methods.createResetPasswordToken = function () {
  const resetToken = crypto.createHash("sha256").update(crypto.randomBytes(32).toString("hex")).digest("hex")

  this.passwordResetToken = resetToken
  // this.passwordResetExpires = Date.now() + 10 * 60 * 1000

  return resetToken
}

userSchema.methods.createEmailConfirmationToken = function () {
  const confirmationToken = crypto.createHash("sha256").update(crypto.randomBytes(32).toString("hex")).digest("hex")

  this.emailConfirmationToken = confirmationToken

  return confirmationToken
}

module.exports = mongoose.model("User", userSchema)