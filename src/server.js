const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const HttpException = require("./utils/HttpException.utils");
const errorMiddleware = require("./middleware/error.middleware");
const userRouter = require("./routes/user.route");
const questionnaireRouter = require("./routes/questionnaire.route");
const calcRouter = require("./routes/calc.route");
const settingsRouter = require("./routes/settings.route");
const flash = require("express-flash");
const goalRouter = require("./routes/goal.route");
const activitiesRouter = require("./routes/activities.route");;

// Init express
const app = express();
app.disable('x-powered-by');
var tokens = require('csrf')
var secret = tokens.secretSync()
var token = tokens.create(secret)

tokens.secret(function (err, secret) {
  if (err) throw err
  console.log(secret)
})

tokens.secret().then(function (secret) {
  console.log(secret)
})

var secret = tokens.secretSync()

if (!tokens.verify(secret, token)) {
  throw new Error('invalid token!')
}
// Init environment
dotenv.config();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(`/api/users`, userRouter);
app.use(`/api/questionnaire`, questionnaireRouter);
app.use(`/api/calculator`, calcRouter);
app.use(`/api/settings`, settingsRouter);
app.use(`/api/goals`, goalRouter);
app.use(`/api/activities`, activitiesRouter);

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
