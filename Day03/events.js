const EventEmitter = require("events");
const emmiter = new EventEmitter();

emmiter.on("userRegister", () => {
  console.log("User registered successfully");
});

emmiter.emit("userRegister");

const user = {
  name: "John Doe",
  password: "password",
};

emmiter.on("login", (user) => {
  console.log(`User ${user.name} logged in successfully`);
});

emmiter.emit("login", user);
