import { Sequelize } from "sequelize";
import sequelize from "../util/db.js";
import User from "./User.js";

const Post = sequelize.define("Post", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
Post.belongsTo(User)
export default Post;
