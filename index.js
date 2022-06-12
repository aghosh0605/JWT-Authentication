require("dotenv").config();
const express = require("express");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
require("./config/database").connect();
const app = express();
port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Healthcheck Ok" });
});

//Login
app.use("/login", loginRouter);
//Login
app.use("/register", registerRouter);

app.listen(port, () => {
  console.log(`Webserver listening on port ${port}`);
});
