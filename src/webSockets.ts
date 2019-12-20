import { parse } from "cookie";
import { createServer } from "http";
import jwt, { VerifyErrors } from "jsonwebtoken";
import io, { Socket } from "socket.io";
import { jwtSecretKey } from "./common/constants";
import { TokenPayload } from "./Services/Users/AuthController";

export const ioSocket = (app: any) => {
  const clients = new Map<string, {userId: string, clientSocket: Socket}>();

  const server = createServer(app.callback());
  const socket = io(server);

  socket.on("connection", (clientSocket) => {
    const {headers} = clientSocket.request;
    const cookie = parse(headers.cookie || "");
    const token = cookie?.token;
    if (token) {
      jwt.verify(token, jwtSecretKey, (err: VerifyErrors, decoded: TokenPayload) => {
        if (err) {
          clientSocket.disconnect();

          return;
        }
        const userId = decoded.id;
        clients.set(clientSocket.id, {userId, clientSocket});
        clientSocket.emit("SET_NAME", decoded.role);
        clientSocket.on("message", (data: string) => {
          clients.forEach((item) => {
            if (item.userId === JSON.parse(data).recipientId) {
              item.clientSocket.emit("message", data);
            }
          });
        });

        clientSocket.on("disconnect", () => {
          if (clients.has(clientSocket.id)) {
            clients.delete(clientSocket.id);
          }
        });
      });
    } else {
      clientSocket.disconnect();
    }
  });
  server.listen("3131");
};
