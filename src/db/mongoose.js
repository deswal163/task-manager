const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/task-manager-api");

const User = mongoose.model("User", {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

const Task = mongoose.model('Tasks', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const task = new Task({
    description: "task-1",
    completed: false
})


task.save()
  .then(() => {
    console.log(task);
  })
  .catch((error) => {
    console.log(error);
  });
