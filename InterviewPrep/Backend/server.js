require("dotenv").config();
const app = require("./src/app");
const authRouter = require("./src/routes/auth.routes");

const connectDB = require("./src/db/db");

connectDB();

app.use("/api/auth", authRouter);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
