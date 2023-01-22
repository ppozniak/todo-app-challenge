import type { IUser } from "./user";
import type { ITodo } from "./todo";
import type { Socket } from "socket.io";

export interface IServerToClientEvents {
  todos: (todos: ITodo[]) => void;
}

export interface IClientToServerEvents {
  "request todos": () => void;
  "new todo": (newTodo: Omit<ITodo, "id">) => void;
  "delete todo": (id: ITodo["id"]) => void;
}

export interface IInterServerEvents {}

export interface ISocketData {
  username: IUser["username"];
}

export type CustomSocket = Socket<
  IClientToServerEvents,
  IServerToClientEvents,
  IInterServerEvents,
  ISocketData
>;
