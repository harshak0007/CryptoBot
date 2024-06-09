const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
  },
  membershipType: {
    type: String,
    lowercase: true,
    default: "notMember",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide your password."],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please provide your password."],
    validator: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not same.",
    },
  },
});

userSchema.pre("save", async function (next) {
  // Only run this function if the password was actually changed
  if (!this.isModified("password")) return next();

  // HASH the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //  Delete passwordconfirm filed
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  // This points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.passwordChangedAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changeTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changeTimestamp;
  }
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
