const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const logger = require("morgan");

const app = express();

// Set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/data", express.static(path.join(__dirname, "data")));

// Import route files
const indexRouter = require("./routes/index");
const omRouter = require("./routes/om");
const prosjekterRouter = require("./routes/prosjekter");
const ferdigheterRouter = require("./routes/ferdigheter");
const kontaktRouter = require("./routes/kontakt");
const hjemRouter = require("./routes/hjem");

// Use route files
app.use("/", indexRouter);
app.use("/om", omRouter);
app.use("/prosjekter", prosjekterRouter);
app.use("/ferdigheter", ferdigheterRouter);
app.use("/kontakt", kontaktRouter);
app.use("/hjem", hjemRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
