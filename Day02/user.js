const fs = require("fs");

function getUser(callback) {
  fs.readFile("users.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const users = JSON.parse(data);
    callback(null, users);
  });
}

module.exports = getUser;
