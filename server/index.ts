import { Server } from "socket.io";
import { todos, users } from "./db";
import { authMiddleware } from "./middlewares";
import { remove } from "lodash";
import { v4 as uuid } from "uuid";

import {
  IClientToServerEvents,
  IInterServerEvents,
  IServerToClientEvents,
  ISocketData,
} from "../types/socket";

// @TODO: Clean up this file
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

  socket.on("new todo", (newTodo) => {
    console.log("new todo", newTodo);
    todos.push({ ...newTodo, id: uuid() });
    io.emit("todos", todos);
  });

  // @TODO: There is a security concern - no auth meaning person could delete others todos
  socket.on("delete todo", (id) => {
    console.log("delete", id);
    remove(todos, ["id", id]);
    io.emit("todos", todos);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    remove(users, ["id", socket.id]);
    console.log("Current users: ", users);
  });
});

io.listen(3000);
