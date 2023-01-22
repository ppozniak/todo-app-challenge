import { remove } from "lodash";
import { CustomSocket } from "@/types/socket";
import { handleDeleteTodo, handleNewTodo, handleRequestTodos } from "./todos";
import { users } from "../db";

const handleDisconnect = (socket: CustomSocket) => () => {
  remove(users, ["id", socket.id]);
};

export const handleConnection = (socket: CustomSocket) => {
  const username = socket.data.username;

  if (username) {
    users.push({ id: socket.id, username });
  } else {
    socket.disconnect();
  }

  socket.on("request todos", handleRequestTodos(socket));
  socket.on("new todo", handleNewTodo(socket));
  socket.on("delete todo", handleDeleteTodo(socket));

  socket.on("disconnect", handleDisconnect(socket));
};
