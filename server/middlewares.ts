import { some } from "lodash";
import { socketServer } from "socket-server";
import { users } from "./db";

type Middleware = Parameters<typeof socketServer["use"]>[0];

export const authMiddleware: Middleware = (socket, next) => {
  const username = socket.handshake.auth.username;
  const usernameTaken = some(users, ["username", username]);

  if (!username) {
    return next(new Error("Please provide an username"));
  } else if (usernameTaken) {
    return next(new Error("Username is taken"));
  }

  socket.data.username = username;
  next();
};
