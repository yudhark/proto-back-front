import BaseRoutes from "./base.route";
import SocketRoute from "./socket.route";

const RouterList: Array<BaseRoutes> = [new SocketRoute()];

export default RouterList;
