//oprtation to get all users from firebase database

var admin = require("./fbconfig");

async function getUsers() {
  try {
    admin
      .auth()
      .getUsers([])
      .then((getUsersResult) => {
        console.log("Successfully fetched user data:");
        getUsersResult.users.forEach((userRecord) => {
          console.log(userRecord);
        });
      });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getUsers: getUsers,
};
