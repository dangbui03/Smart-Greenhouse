require("dotenv").config();
const path = require("path");
const http = require("http");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const app = express();

const corsOptions = require("./configs/corsOptions");
const errorHandler = require("./middleware/errorHandler");
const { logger } = require("./middleware/logEvents");
const credentials = require("./middleware/credentials");

//use setup
app.use(logger);
app.use(credentials);
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(bodyParser.json());

app.use(cookieParser());
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// error handler
app.use(errorHandler);

const port = process.env.API_PORT;
app.listen(port, () => {
  console.log(`Server is running at http://127.0.0.1:${port}`);
});
