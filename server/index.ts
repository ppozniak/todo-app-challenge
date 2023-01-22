import { authMiddleware } from "./middlewares";
import { handleConnection } from "./handlers/connection";
import { socketServer } from "./socket-server";

socketServer.use(authMiddleware);
socketServer.on("connection", handleConnection);
socketServer.listen(3000);
