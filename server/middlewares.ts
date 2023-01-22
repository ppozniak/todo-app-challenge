import { some } from "lodash";
import { users } from "./db";

// @TODO: Type this, disallow `any` in ts config
export const authMiddleware = (socket: any, next: any) => {
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
