const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://0.0.0.0:27017/task-manager-api");

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
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
});

// const user = new User({
//   name: "Shubham   ",
//   email: "    SHubhamMM@gmail.com",
//   password: "12345passwod"
// });

// user
//   .save()
//   .then(() => {
//     console.log(user);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const task = new Task({
  description: "task-1",
});

task
  .save()
  .then(() => {
    console.log(task);
  })
  .catch((error) => {
    console.log(error);
  });
