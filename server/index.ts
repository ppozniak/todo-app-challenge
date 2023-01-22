import { Server } from "socket.io";

import {
  IClientToServerEvents,
  IInterServerEvents,
  IServerToClientEvents,
  ISocketData,
  IUser,
} from "./types";

// This would normally be in some DB
const users: IUser[] = [];

const io = new Server<
  IClientToServerEvents,
  IServerToClientEvents,
  IInterServerEvents,
  ISocketData
>({
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New connection: ", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

io.listen(3000);
