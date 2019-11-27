import { sign } from "jsonwebtoken";
import sha256 from "sha256";
import { Body, Controller, Post, Route, Tags } from "tsoa";
import { jwtSecretKey } from "../../common/constants";
import { ErrorType } from "../../common/errorType";
import { ApiError } from "../../common/handlers/errorHandler";
import { Login, Registration, User } from "./UsersModel";
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
  registration(@Body() body: Registration): Promise<User> {
    const {email} = body;
    if (!email) {
      return Promise.reject(new ApiError("ValidateException", 400, ErrorType.ValidateException, "Email is note valid"));
    }

    return createUser(body).then((result) => {
      return getUsersById(result.dataValues.id);
    });
  }

  @Post("/login")
  login(@Body() body: Login): Promise<string> {

    const {username, password} = body;

    return getUsersByAttr({username})
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
