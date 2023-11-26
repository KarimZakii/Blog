import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import sequelize from "./util/db.js";
import authRouter from "./routes/auth.js";
import feedRouter from "./routes/feed.js";
import User from "./models/User.js";
import Post from "./models/Post.js";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("connected");
});

// Routes
app.use(authRouter);
app.use(feedRouter);

User.hasMany(Post, { onDelete: "CASCADE" });
Post.belongsTo(User);

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
