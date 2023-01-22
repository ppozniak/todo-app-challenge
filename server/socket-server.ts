import { Server } from "socket.io";
import {
  IClientToServerEvents,
  IInterServerEvents,
  IServerToClientEvents,
  ISocketData,
} from "../types/socket";

export const socketServer = new Server<
  IClientToServerEvents,
  IServerToClientEvents,
  IInterServerEvents,
  ISocketData
>({
  cors: {
    origin: "*",
  },
});
