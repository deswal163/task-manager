require("../src/db/mongoose");
const Task = require("../src/models/task");

// Task.findByIdAndDelete('65d9b4c9e86dcf568a5be60e').then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false })
// }).then((count) => {
//     console.log(count);
// }).catch((e) => {
//     console.log(e);
// })

const deleteAndCount = async (id) => {
  const deletedTask = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });

  return count;
};

deleteAndCount('65d9ecce190413222182379c')
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
