const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const HttpException = require("./utils/HttpException.utils");
const errorMiddleware = require("./middleware/error.middleware");
const userRouter = require("./routes/user.route");
const questionnaireRouter = require("./routes/questionnaire.route");
const calcRouter = require("./routes/calc.route");
const goalRouter = require("./routes/goal.route");

// Init express
const app = express();
// Init environment
dotenv.config();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());

app.use(`/api/users`, userRouter);
app.use(`/api/questionnaire`, questionnaireRouter);
app.use(`/api/calculator`, calcRouter);
// app.use(`/api/goals`, goalRouter);

// 404 error
app.all("*", (req, res, next) => {
  const err = new HttpException(404, "Endpoint Not Found");
  next(err);
});

// Error middleware
app.use(errorMiddleware);

// starting the server
const port = Number(process.env.PORT || 3331);
app.listen(port, () => console.log(`🚀 Server running on port ${port}!`));

module.exports = app;
