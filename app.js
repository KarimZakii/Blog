import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import sequelize from "./util/db.js";
import authRouter from "./routes/auth.js";

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

// Routes
app.use(authRouter);

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
