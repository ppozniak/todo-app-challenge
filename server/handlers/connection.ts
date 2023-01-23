import { remove } from "lodash";
import { CustomSocket } from "@/types/socket";
import { handleRemoveTodo, handleNewTodo, handleRequestTodos } from "./todos";
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

  socket.on("todos:request", handleRequestTodos(socket));
  socket.on("todos:create", handleNewTodo(socket));
  socket.on("todos:remove", handleRemoveTodo(socket));

  socket.on("disconnect", handleDisconnect(socket));
};
