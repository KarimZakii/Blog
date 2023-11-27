import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Database connection
const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "Eduncy_Blog",
});
export default sequelize;
