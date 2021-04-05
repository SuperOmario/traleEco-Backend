const winston = require("winston");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: ".env-local" });

const app = express();

/**
 * Middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Routes
 */
require("./startup/cors")(app);
require("./startup/routes")(app);

app.get("/", (request, response) => {
  response
    .status(200)
    .send(
      "This is not why you're here. Head to /user/:id and replace :id with your user id"
    );
});

/**Start listening */
const PORT = process.env.PORT || "3001";
app.listen(PORT, () => {
  winston.info(`Listening for requests on port ${PORT}`);
});
