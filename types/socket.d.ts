import { IUser } from "./user";
import { ITodo } from "./todo";

export interface IServerToClientEvents {
  todos: (todos: ITodo[]) => void;
}

export interface IClientToServerEvents {
  "request todos": () => void;
  "new todo": (newTodo: Todo) => void;
}

export interface IInterServerEvents {}

export interface ISocketData {
  username: IUser["username"];
}
