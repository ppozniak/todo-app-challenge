import { Server } from "socket.io";
import { todos, users } from "./db";
import { authMiddleware } from "./middlewares";
import { remove } from "lodash";

import {
  IClientToServerEvents,
  IInterServerEvents,
  IServerToClientEvents,
  ISocketData,
} from "../types/socket";

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

io.use(authMiddleware);

io.on("connection", (socket) => {
  console.log("New connection: ", socket.id);
  const username = socket.data.username;

  if (username) {
    users.push({ id: socket.id, username });
  } else {
    socket.disconnect();
  }

  console.log("Current users: ", users);

  socket.on("request todos", () => {
    socket.emit("todos", todos);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    remove(users, ["id", socket.id]);
    console.log("Current users: ", users);
  });
});

io.listen(3000);
