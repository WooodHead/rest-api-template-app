import { parse } from "cookie";
import jwt from "jsonwebtoken";
import { Server } from "ws";
import { jwtSecretKey } from "./common/constants";

const wss = new Server({port: 3030, clientTracking: true});

export const webSocket = () => {
  const clients = new Map<string, any>();
  wss.on("connection", (clientSocket, request) => {
    const {headers} = request;
    const cookie = parse(headers.cookie || "");
    const token = cookie?.token;
    if (token) {
      jwt.verify(token, jwtSecretKey, (err: any, decoded: any) => {
        if (err) {
          clientSocket.close();

          return;
        }
        const userId = decoded.id;
        console.log("Connected user id = ", userId);
        clients.set(userId, clients.get(userId) ? [...clients.get(userId), clientSocket] : [clientSocket]);
        clientSocket.on("message", (data: string) => {
          clients.get(JSON.parse(data).recipientId)?.map((client) => client.send(data));
        });

        clientSocket.on("close", () => {
          if (clients.has(userId)) {
            const activeClients = clients.get(userId).filter((item) => item.readyState === 1);
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