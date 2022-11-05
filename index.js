const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { mongodbConnection } = require("./config/db");
dotenv.config();
const cookieParser = require("cookie-parser");
const Routing = require("./routes/index");
const Port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/v1", Routing);
//Handle every request that reaches this line
app.get("/home", (req, res) => {
  res.send("Hello World!");
});

app.listen(Port, () => {
  mongodbConnection(process.env.uri);
  console.log(`server started at ${Port}`);
});
