import { FindOptions } from "sequelize";
import { ErrorType } from "../../common/errorType";
import { ApiError } from "../../common/handlers/errorHandler";
import { IUserModel, UpdateUserBody, Users } from "./UsersModel";

type IGetAllusers = <T extends keyof Users>(options?: FindOptions<T>) => Promise<Pick<Users, T>[]>;

export class UsersService {
  getAllUsers: IGetAllusers = (options) => {
    return Users.findAll(options).then((result) => result);
  };

  getUsersByAttr = (options?: FindOptions<keyof Users>): any => {
    return Users.findOne(options).then((result) => {
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

  getUsersById = (id: number | string, options?: FindOptions): any => {
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

  createUser = (body: IUserModel): any => {
    return Users.create(body)
      .catch((e) =>
        Promise.reject(new ApiError("ServerError", 500, ErrorType.DataBaseErrorException, e.message)));
  };

  updateUser = (id: number | string, body: UpdateUserBody, options?: FindOptions): any => {
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
