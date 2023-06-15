// /////////////////////////////////////////////////////////////////////////////
// IMPORTANT:
// THE CODE BELOW IS READ ONLY CODE AND YOU SHOULD INSPECT IT TO SEE WHAT IT
// DOES IN ORDER TO COMPLETE THE TASK, BUT DO NOT MODIFY IT IN ANY WAY AS THAT
// WILL RESULT IN A TEST FAILURE
// /////////////////////////////////////////////////////////////////////////////

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const db = require("./db/model/index");
const { default: playerRoute } = require("./routes/Players/player.route");
const { default: errorHandler } = require("./middleware/error.handler");
const {
  default: CustomErrorHandler,
} = require("./middleware/custom.error.handler");

var corsOptions = {
  origin: "http://localhost:8080",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use("/api", playerRoute);

app.use((err, req, res, next) => {
  if (err instanceof CustomErrorHandler) {
    return res.status(err.status).json({
      error: {
        message: err.message,
        status: err.status,
      },
    });
  } else {
    return res.status(500).json({
      error: {
        message: err.message,
        status: err.status,
      },
    });
  }
});
app.use(errorHandler);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
