import { UsersModel } from "./UsersModel";

export const UsersService = {
  getAllUsers: (options) => {
    return UsersModel.findAll(options);
  },

  getUsersById: (id) => {
    return UsersModel.findByPk(id);
  },

  createUser: (props: any) => {
    return UsersModel.create(props);
  },

  updateUser: (id: number, props: any) => {
    return UsersModel.update(props, {where: {id}});
  },

  deleteUser: (id: number) => {
    return UsersModel.destroy({where: {id}});
  },
};
