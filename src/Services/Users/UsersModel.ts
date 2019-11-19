import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db/db";

export interface IUserModel {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;

  passwordHash: string;
  salt: string;

  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface RegistrationBody {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginBody {
  username: string;
  password: string;
}

export interface UpdateUserBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
}

export class Users extends Model {
  public username: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public passwordHash: string;
  public salt: string;
  public role: string;
  private id: number;

  // timestamps!
  private readonly createdAt: Date | string;
  private readonly updatedAt: Date | string;
}

Users.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(15),
    allowNull: true,
    validate: {
      len: [5, 10],
    },
  },
  firstName: {
    type: DataTypes.STRING(40),
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING(40),
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING(40),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: true,
    validate: {
      isEmail: true,
    },
  }
  ,
  passwordHash: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  salt: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
}, {
  sequelize,
  modelName: "Users",
});

Users.sync({force: false}).then(() => {
});
