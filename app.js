require("dotenv").config();

const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const morgan = require("morgan");
const taskRouter = require("./routes/taskRoute");
const profileRouter = require("./routes/profileRoute");
const groupRouter = require("./routes/groupRoute");
const messageRouter = require("./routes/messageRoute");
const uploadPhotoRouter = require("./routes/uploadPhoto");

const auth = require("./routes/auth");

// MONGOOSE CONNECTION
// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useUnifiedTopology: true,
//     keepAlive: true,
//     useNewUrlParser: true,
//   })
//   .then(() => console.log(`Connected to database`))
//   .catch((err) => console.error(err));

//MONGOOSE CONNECTION NUEVA
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to database`))
  .catch((err) => console.error(err));

// EXPRESS SERVER INSTANCE
const app = express();

// CORS MIDDLEWARE SETUP
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://ohmyhome-c0626.web.app"],
  })
);
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

// SESSION MIDDLEWARE
// app.use(
//   session({
//     store: new MongoStore({
//       mongooseConnection: mongoose.connection,
//       ttl: 24 * 60 * 60, // 1 day
//     }),
//     secret: process.env.SECRET_SESSION,
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 24 * 60 * 60 * 1000,
//     },
//   })
// );

// SESSION MIDDLEWARE NUEVA
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60 * 24 * 7,
    }),
  })
);

// MIDDLEWARE
app.use(morgan("dev"));
// app.use(express.json());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ROUTER MIDDLEWARE
app.use("/auth", auth);
//EMPIEZA AQUI
app.use("/api", taskRouter);
app.use("/profile", profileRouter);
app.use("/group", groupRouter);
app.use("/message", messageRouter);
app.use("/photo", uploadPhotoRouter);

// ERROR HANDLING
// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({ code: "not found" });
});

app.use((err, req, res, next) => {
  // always log the error
  console.error("ERROR", req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    const statusError = err.status || "500";
    res.status(statusError).json(err);
  }
});

module.exports = app;
