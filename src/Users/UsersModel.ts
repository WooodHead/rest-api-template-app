import * as Sequelize from "sequelize";
import { Model } from "sequelize";
import { sequelize } from "../db/db";

export class Users extends Model {
}

Users.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: "Users",
});

Users.sync({}).then(() => {
});
