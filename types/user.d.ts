import { Socket } from "socket.io";

export interface IUser {
  id: Socket["id"];
  username: string;
}
