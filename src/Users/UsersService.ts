import { FindOptions } from "sequelize";
import { Users } from "./UsersModel";

export const UsersService = {
  getAllUsers: (options?: FindOptions) => {
    return Users.findAll(options);
  },

  getUsersById: (id: number | string, options?: FindOptions) => {
    return Users.findByPk(id, options);
  },

  createUser: (body) => {
    return Users.create(body);
  },

  updateUser: (id: number | string, body) => {
    return Users.update(body, {where: {id}});
  },

  deleteUser: (id: number | string) => {
    return Users.destroy({where: {id}});
  },
};
