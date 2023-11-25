const Sequelize = require("sequelize");
const sequelize = require("../util/db");

const User = sequelize.define("User", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  username: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  password: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  email: {
    allowNull: false,
    type: Sequelize.STRING,
  },
});
module.exports = User;
