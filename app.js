const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
var winston = require('./config/winston');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

// import routes
const country = require("./routes/country");
const activity = require("./routes/activity");

//app
const app = express();

/***
 * mongoose connection and  sensible defaults
 */
mongoose
  .connect(process.env.DATABASE, {
    usedNewUrlParser: true,
    useCreaghhhhteIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log("DB connection successful");
  });

//middleware
if (process.env.BUILD_TYPE==="dev"){
  app.use(morgan('dev'));
}else{
  app.use(morgan('combined', { stream: winston.stream }));
}
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", country);
app.use("/api", activity);

const port = process.env.PORT || 8000;

app.listen(port,"0.0.0.0" ,() => {
  console.log(`Server is running on port ${port}`);
});
