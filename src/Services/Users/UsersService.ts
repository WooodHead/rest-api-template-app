import { WhereOptions } from "sequelize";
import { ErrorType } from "../../common/errorType";
import { ApiError } from "../../common/handlers/errorHandler";
import { IUserModel, UpdateUserBody, Users } from "./UsersModel";

export class UsersService {
  getAllUsers = (page?: number, limit?: number) => {
    return Users.findAll(
      {
        limit,
        attributes: ["id", "username", "firstName", "lastName"],
        offset: limit ? page && (page > 0 ? page - 1 : page) * limit : undefined,
        order: [
          ["createdAt", "DESC"],
        ],
      },
    );
  };

  getUsersByAttr = (where: WhereOptions) => {
    return Users.findOne({
      where,
    }).then((result) => {
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

  getUsersById = (id: number | string) => {
    return Users.findByPk(id, {
      attributes: ["id", "username", "firstName", "lastName", "email", "role"],
    }).then((result) => {
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

  updateUser = (id: number | string, body: UpdateUserBody) => {
    return Users.update(body, {where: {id}})
      .then(() => this.getUsersById(id), (e) =>
        Promise.reject(new ApiError("ServerError", 500, ErrorType.DataBaseErrorException, e.message)));
  };

  deleteUser = (id: number | string) => {
    return Users.destroy({where: {id}})
      .catch((e) =>
        Promise.reject(new ApiError("ServerError", 500, ErrorType.DataBaseErrorException, e.message)));
  };
}
