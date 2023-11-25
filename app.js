const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const sequelize = require("./util/db");

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("connected");
});

//routes

async function startServer() {
  try {
    await sequelize.sync({ force: false });
    console.log("Database synchronized");
    app.listen(3000);
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
}

startServer();