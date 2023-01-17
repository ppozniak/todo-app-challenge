const { Server } = require("socket.io");
const io = new Server({
  cors: {
    origin: "*",
  },
});

io.on("connection", () => {});

io.listen(3000);
