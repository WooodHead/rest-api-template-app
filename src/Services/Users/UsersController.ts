import { Body, Controller, Delete, Get, Put, Query, Route, Security, Tags } from "tsoa";
import { IUserModel, UpdateUserBody, User, Users } from "./UsersModel";
import { UsersService } from "./UsersService";

const {
  getUsersById,
  // createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} = new UsersService();

@Tags("Users")
@Route("api/users")
export class UsersController extends Controller {

  @Get()
  getAllUsers(@Query("page") page?: number, @Query("limit") limit?: number): Promise<User[]> {
    const attributes: (keyof IUserModel)[] = ["id", "username", "firstName", "lastName", "email"];

    return getAllUsers(
      {
        attributes,
        limit,
        offset: limit ? page && (page > 0 ? page - 1 : page) * limit : undefined,
        order: [
          ["createdAt", "DESC"],
        ],
      },
    );
  }

  @Get("{id}")
  getUserById(id: string): Promise<User> {
    const attributes: (keyof IUserModel)[] = ["id", "username", "firstName", "lastName", "email"];

    return getUsersById(id, {
      attributes,
    });
  }

  @Security("jwt", ["Admin"])
  @Put("/{id}")
  updateUser(id: string, @Body() body: UpdateUserBody): Promise<{ role: string } & User> {
    const attributes: (keyof IUserModel)[] = ["id", "username", "firstName", "lastName", "email", "role"];

    return updateUser(id, body, {attributes});
  }

  @Security("jwt", ["Admin"])
  @Delete("/{id}")
  deleteUser(id: string): Promise<number> {
    return deleteUser(id);
  }

}
