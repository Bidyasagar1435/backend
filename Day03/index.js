// const http = require("http");

// const server = http.createServer((req, res) => {
//   res.end("Hello World");
// });

// server.listen(8000, () => {
//   console.log("Server is running on port 8000");
// });

// const { add, subtract, multiply, divide } = require("./calculator");

// console.log(add(10, 20));
// console.log(subtract(10, 3));
// console.log(multiply(10, 5));
// console.log(divide(20, 4));

// const getUser = require("./user");
// console.log(getUser());



async function main() {
  const { default: chalk } = await import("chalk");

  console.log(chalk.green("Hello from Chalk!"));
  console.log(chalk.blue("Node.js is working!"));
  console.log(chalk.red("This is a test message."));
}

main();
