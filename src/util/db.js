import { Sequelize } from "sequelize";

// Database connection
const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "12345",
  database: "Eduncy_Blog",
});
export default sequelize;