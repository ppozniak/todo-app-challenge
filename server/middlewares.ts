import { users } from "./db";
import { some } from "lodash";

// @TODO: Type this, disallow `any` in ts config
export const authMiddleware = (socket, next) => {
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
