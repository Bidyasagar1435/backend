const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello World");
});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});

const { add, subtract, multiply, divide } = require("./calculator");

console.log(add(10, 20));
console.log(subtract(10, 3));
console.log(multiply(10, 5));
console.log(divide(20, 4));

const getUser = require("./user");
console.log(getUser());
