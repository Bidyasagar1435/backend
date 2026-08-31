const EventEmitter = require("events");
const emmiter = new EventEmitter();

emmiter.on("userRegister", (user) => {
  console.log("User registered successfully");
  console.log(user.name);
  
});

emmiter.emit("userRegister");
