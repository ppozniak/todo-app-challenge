import { io } from "socket.io-client";

export const socket = io("localhost:3000", {
  autoConnect: false,
});

if (process.env.NODE_ENV === "development") {
  socket.onAny((event, ...args) => {
    console.log(event, args);
  });
}
