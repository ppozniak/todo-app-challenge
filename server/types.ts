import { Socket } from "socket.io";

export interface IUser {
  id: Socket["id"];
  username: string;
}

export interface IServerToClientEvents {}

export interface IClientToServerEvents {}

export interface IInterServerEvents {}

export interface ISocketData {
  username: IUser["username"];
}
