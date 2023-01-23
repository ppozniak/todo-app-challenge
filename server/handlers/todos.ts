import { v4 as uuid } from "uuid";
import { remove } from "lodash";

import { socketServer } from "../socket-server";
import { CustomSocket } from "@/types/socket";
import { ITodo } from "@/types/todo";
import { todos } from "../db";

export const handleRequestTodos = (socket: CustomSocket) => () => {
  socket.emit("todos", todos);
};

// @TODO: This should trim strings if too long
export const handleNewTodo =
  (socket: CustomSocket) => (newTodo: Omit<ITodo, "id">) => {
    todos.push({ ...newTodo, id: uuid() });
    socketServer.emit("todos", todos);
  };

// @TODO: There is a security concern - no auth meaning person could delete others todos
export const handleDeleteTodo = (socket: CustomSocket) => (id: ITodo["id"]) => {
  remove(todos, ["id", id]);
  socketServer.emit("todos", todos);
};
