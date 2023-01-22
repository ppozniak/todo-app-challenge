import { io } from "socket.io-client";
import type {
  IServerToClientEvents,
  IClientToServerEvents,
} from "@/../types/socket";
import type { Socket } from "socket.io-client";

export const socket: Socket<IServerToClientEvents, IClientToServerEvents> = io(
  "localhost:3000",
  {
    autoConnect: false,
  }
);

if (process.env.NODE_ENV === "development") {
  socket.onAny((event, ...args) => {
    console.log(event, args);
  });
}
