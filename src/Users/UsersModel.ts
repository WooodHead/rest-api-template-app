import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/db";

export interface IUsersDTO {
  id: number;
  name: string;
}

interface IResult<T> {
  result: T;
}

export const toResult = <T>(items: T): IResult<T> => ({
  result: items,
});

export class Users extends Model {

  public id: number;
  public name: string;
  public description: string;

  // timestamps!
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

Users.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: "Users",
});

Users.sync({}).then(() => {
});
