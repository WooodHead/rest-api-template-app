import { Body, Controller, Delete, Get, Put, Query, Route, Security, Tags } from "tsoa";
import { ErrorType } from "../../common/errorType";
import { ApiError } from "../../common/handlers/errorHandler";
import { BasePageResult } from "../../dto/BasePageResult";
import { UpdateUser, User, Users } from "./UsersModel";
import { UsersService } from "./UsersService";

const {
  getUsersById,
  deleteUser,
  getAllUsers,
  updateUser,
} = new UsersService();

@Tags("Users")
@Route("api/users")
export class UsersController extends Controller {

  @Get()
  getAllUsers(@Query("page") page?: number, @Query("limit") limit?: number): Promise<BasePageResult<User>> {
    try {
      return getAllUsers(page, limit).then((result) => ({
        page,
        limit,
        count: result.length,
        items: result,
      }));
    } catch (e) {
      return Promise.reject(new ApiError("", 500, ErrorType.DataBaseErrorException));
    }
  }
  @Security("jwt", ["Admin"])
  @Get("{id}")
  getUserById(id: string): Promise<User> {
    return getUsersById(id);
  }

  @Put("/{id}")
  updateUser(id: string, @Body() body: UpdateUser): Promise<{ role: string } & User> {
    return updateUser(id, body);
  }

  @Security("jwt", ["Admin"])
  @Delete("/{id}")
  deleteUser(id: string): Promise<number> {
    return deleteUser(id);
  }

}
