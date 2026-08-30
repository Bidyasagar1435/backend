const http = require("http");
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  const user = {
    success: true,
    message: "Hello World",
    developer: "Your Name",
  };

  res.end(JSON.stringify(user));
});


server.listen(8000, () => {
  console.log("Server is running on port 8000");
});



// const http = require("http");

// const server = http.createServer((req, res) => {
//   res.setHeader("Content-Type", "application/json");

//   res.end(
//     JSON.stringify({
//       success: true,
//       message: "Hello World",
//       developer: "Your Name",
//     })
//   );
// });

// server.listen(8000, () => {
//   console.log("Server is running on port 8000");
// });