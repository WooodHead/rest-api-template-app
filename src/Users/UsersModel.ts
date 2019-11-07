import * as Sequelize from "sequelize";
import { Model } from "sequelize";
import { sequelize } from "../db/db";

export class UsersModel extends Model {
}

UsersModel.init({
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
  modelName: "UsersModel",
});

UsersModel.sync({force: true}).then(() => {
  // Now the `users` table in the database corresponds to the model definition
  return UsersModel.create({
    name: "John",
    description: "Hancock",
  });
});
