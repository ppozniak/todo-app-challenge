import type { IUser } from "./user";
import type { ITodo } from "./todo";
import type { Socket } from "socket.io";

export interface IServerToClientEvents {
  "todos:list": (todos: ITodo[]) => void;
}

export interface IClientToServerEvents {
  "todos:request": () => void;
  "todos:create": (newTodo: Omit<ITodo, "id">) => void;
  "todos:remove": (id: ITodo["id"]) => void;
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
