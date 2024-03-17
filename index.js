const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const productRoute = require("./routes/product");
const authRoute = require("./routes/auth");
const cookieParser = require("cookie-parser");
const port = 5678;
const app = express();

mongoose
  .connect("mongodb://localhost:27017/SWD")
  .then(() => console.log("Connected Successfully"))
  .catch((err) => {
    console.error(err);
  });
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(morgan("common"));
app.use("/product", productRoute);
app.use("/auth", authRoute);

// app.get("/", (req, res) => {
//   res.status(200).json("Hello");
// });

app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`);
});
