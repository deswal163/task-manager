require("../src/db/mongoose");
const User = require("../src/models/user");

// 65d9b956f92161e1156d909a

// User.findByIdAndUpdate('65d9b956f92161e1156d909a', { age: 20 }).then((user) => {
//     console.log(user);
//     return User.countDocuments({age: 20})
// }).then((usersCount) => {
//     console.log(usersCount);
// }).catch((e) => {
//     console.log(e);
// })

const updateAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });

  return count;
};

updateAndCount('65d9baf8fcce5e2c3af8713e', 20).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
})
