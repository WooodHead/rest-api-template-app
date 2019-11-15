import { FindOptions } from "sequelize";
import { ErrorType } from "../../common/errorType";
import { ApiError } from "../../common/handlers/errorHandler";
import { Registration, UpdateUserBody, Users } from "./UsersModel";

export class UsersService {
  getAllUsers = (options?: FindOptions) => {
    return Users.findAll(options);
  };

  getUsersById = (id: number | string, options?: FindOptions) => {
    return Users.findByPk(id, options).then((result) => {
      if (result === null) {
        return Promise
          .reject(
            new ApiError("User not found", 400, ErrorType.UserNotFoundException),
          );
      }

      return Promise.resolve(result);
    }, (e) =>
      Promise.reject(new ApiError("ServerError", 500, ErrorType.DataBaseErrorException, e.message)));
  };

  createUser = (body: Registration) => {
    return Users.create(body)
      .catch((e) =>
        Promise.reject(new ApiError("ServerError", 500, ErrorType.DataBaseErrorException, e.message)));
  };

  updateUser = (id: number | string, body: UpdateUserBody, options?: FindOptions) => {
    return Users.update(body, {where: {id}})
      .then(() => this.getUsersById(id, options), (e) =>
        Promise.reject(new ApiError("ServerError", 500, ErrorType.DataBaseErrorException, e.message)));
  };

  deleteUser = (id: number | string) => {
    return Users.destroy({where: {id}})
      .catch((e) =>
        Promise.reject(new ApiError("ServerError", 500, ErrorType.DataBaseErrorException, e.message)));
  };
}
