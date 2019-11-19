import { sign } from "jsonwebtoken";
import { Promise } from "sequelize";
import * as sha256 from "sha256";
import { Body, Controller, Post, Route, Tags } from "tsoa";
import * as uuid from "uuid";
import { jwtSecretKey } from "../../common/constants";
import { ErrorType } from "../../common/errorType";
import { ApiError } from "../../common/handlers/errorHandler";
import { IUserModel, LoginBody, RegistrationBody, User } from "./UsersModel";
import { UsersService } from "./UsersService";

const {
  createUser,
  getUsersById,
  getUsersByAttr,
} = new UsersService();

@Tags("Authorization")
@Route("api/auth")
export class AuthController extends Controller {
  @Post("/registration")
  registration(@Body() body: RegistrationBody): Promise<User> {

    const {email, firstName, lastName, username, password} = body;

    if (!email) {
      return Promise.reject(new ApiError("ValidateException", 400, ErrorType.ValidateException, "Email is note valid"));
    }

    const salt = uuid();
    const passwordHash = sha256(password + salt);
    const id = uuid();

    return createUser({
      id,
      email,
      firstName,
      lastName,
      username,
      salt,
      passwordHash,
      role: "User",
    }).then(() => {
      const attributes: (keyof IUserModel)[] = ["id", "username", "firstName", "lastName", "email"];

      return getUsersById(id, {attributes});
    });
  }

  @Post("/login")
  login(@Body() body: LoginBody): Promise<string> {

    const {username, password} = body;

    return getUsersByAttr({
      where: {username},
    })
      .then((result) => {
        let token = "";
        if (result) {
          const {salt, passwordHash, role} = result;
          if (passwordHash === sha256(password + salt)) {
            token = sign({
              role,
            }, jwtSecretKey, {algorithm: "HS256", expiresIn: "24h"});
            this.setHeader("set-cookie", `token=${token};path=/;HttpOnly`);
          } else {
            return Promise.reject(new ApiError("ValidateException", 400, ErrorType.UnauthorizedException, "Incorrect username or password"));
          }
        }

        return token;
      });
  }

}
