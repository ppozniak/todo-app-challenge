import { IUser } from "./user";
import { ITodo } from "./todo";

export interface IServerToClientEvents {
  todos: (todos: ITodo[]) => void;
}

export interface IClientToServerEvents {
  "request todos": () => void;
}

export interface IInterServerEvents {}

export interface ISocketData {
  username: IUser["username"];
}
