import { Body, Controller, Delete, Get, Put, Query, Route, Security, Tags } from "tsoa";
import { UpdateUserBody, User, Users } from "./UsersModel";
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
    return getAllUsers(page, limit);
  }

  @Get("{id}")
  getUserById(id: string): Promise<User> {
    return getUsersById(id);
  }

  @Security("jwt", ["Admin"])
  @Put("/{id}")
  updateUser(id: string, @Body() body: UpdateUserBody): Promise<{ role: string } & User> {
    return updateUser(id, body);
  }

  @Security("jwt", ["Admin"])
  @Delete("/{id}")
  deleteUser(id: string): Promise<number> {
    return deleteUser(id);
  }

}
