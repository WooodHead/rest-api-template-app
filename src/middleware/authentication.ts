import jwt from "jsonwebtoken";
import { Request } from "koa";
import { jwtSecretKey } from "../common/constants";
import { ErrorType } from "../common/errorType";
import { ApiError } from "../common/handlers/errorHandler";

export function koaAuthentication(request: Request, securityName: string, scopes?: string[]): Promise<any> {
  if (securityName === "jwt") {
    const token = request.ctx.cookies.get("token");

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(
          new ApiError("Unauthorized", 401, ErrorType.UnauthorizedException, "No token provided"));
      } else {
        jwt.verify(token, jwtSecretKey, (err: any, decoded: any) => {
          if (err) {
            reject(err);
          } else {
            // Check if JWT contains all required scopes
            if (scopes) {
              for (const scope of scopes) {
                if (!decoded.role.includes(scope)) {
                  reject(
                    new ApiError("AccessRestricted", 401, ErrorType.AccessRestrictedException, "Access restricted"),
                  );
                }
              }
            }
            resolve(decoded);
          }
        });
      }
    });
  }

  return Promise.resolve({});
}
