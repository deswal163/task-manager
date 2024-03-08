const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Task = require("../models/task");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email.");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 7,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Must not contain word password");
        }
      },
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error("age must be +ve");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          requried: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "SECRET_KEY");
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;
  delete user.tokens;
  delete user.id;
  delete user.avatar;

  return user;
};
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("unable to login");
  }

  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    const user = this;
    await Task.deleteMany({ owner: user._id });
    next();
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
