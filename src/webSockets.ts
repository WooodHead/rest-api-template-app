import { parse } from "cookie";
import jwt, { VerifyErrors } from "jsonwebtoken";
import WebSocket, { Server } from "ws";
import { jwtSecretKey } from "./common/constants";
import { TokenPayload } from "./Services/Users/AuthController";

const wss = new Server({port: 3030, clientTracking: true});

export const webSocket = () => {
  const clients = new Map<string, WebSocket[]>();
  wss.on("connection", (clientSocket, request) => {
    const {headers} = request;
    const cookie = parse(headers.cookie || "");
    const token = cookie?.token;
    if (token) {
      jwt.verify(token, jwtSecretKey, (err: VerifyErrors, decoded: TokenPayload) => {
        if (err) {
          clientSocket.close();

          return;
        }
        const userId = decoded.id;
        clients.set(userId, clients.get(userId) ? [...(clients.get(userId) || []), clientSocket] : [clientSocket]);
        clientSocket.on("message", (data: string) => {
          console.log(clients.get(userId)?.length);
          clients.get(JSON.parse(data).recipientId)?.map((client) => client.send(data));
        });

        clientSocket.on("close", () => {
          if (clients.has(userId)) {
            const activeClients = clients.get(userId)?.filter((item) => item !== clientSocket) || [];
            if (activeClients.length > 0) {
              clients.set(userId, activeClients);
            } else {
              clients.delete(userId);
            }
          }
        });
      });
    } else {
      clientSocket.close();
    }
  });
};
