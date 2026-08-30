const http = require("http"); // built-in module
const lodash = require("lodash");

const server = http.createServer((req, res) => {
  res.end("Backend is working!");
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});

// const math = require("./math");  // own module
// const calculator = require("./calculator")

// console.log(calculator.add(2, 3)); // Example usage of mathjs library
// console.log(calculator.subtract(3, 2));
// console.log(calculator.multiply(3, 2));
// console.log(calculator.divide(3, 2));

// const arr = [2, 4, 8, 1, 3, 5];
// console.log(lodash.reverse(arr));

const fs = require("fs");

// fs.readFile("message.txt", "utf8", (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   console.log(data);
// });

// fs.writeFile("user.txt", "my name is bidyaa", (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log("file created successfully");
// });

// fs.appendFile("user.txt", "  i am learning MERN backend", (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log("File update successfully");
// });

// fs.unlink("user.txt", (err)=>{
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log("File deleted");

// })

// const data = fs.readFileSync("message.txt", "utf8");

// console.log(data);

// console.log("Finished");

const getUser = require("./user");

getUser((err, users) => {
  if (err) {
    console.log(err);
  }
  console.log(users);
});
