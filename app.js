const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const cvRouter = require("./routes/cvRoutes");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorController");

app.use(express.static(`${__dirname}/build`));

app.use(cors());

app.use(express.json({ limit: "10kb" }));
app.use(helmet());

// Security
app.use(mongoSanitize());
app.use(xss());

app.use(cookieParser());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ["save", "signup"],
  })
);
// Limit requests from same IP - 100 requests per hour
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "To many requests from this IP, please try again later.",
});

app.use("/api", limiter);

app.use(compression());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/api/v1/start", (req, res, next) => {
  res.status(200).json({
    status: "Success",
    message: "Hello World",
  });
});

app.use("/api/v1/cv", cvRouter);
app.use("/api/v1", authRouter);
app.use("/api/v1/user", userRouter);

// If no routes are matched until now, this will get excecuted.
app.all("*", (req, res, next) => {
  // next(new AppError(`Cannot find ${req.originalUrl} on this server!`));
  res.send(`<center><h1>Cannot find ${req.originalUrl}</h1></center>`);
});

// Middleware for handling Express errors
app.use(globalErrorHandler);

module.exports = app;
