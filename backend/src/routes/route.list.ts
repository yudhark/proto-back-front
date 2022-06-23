import ApiRoute from "./api.route";
import BaseRoutes from "./base.route";
import SocketRoute from "./socket.route";

const RouterList: Array<BaseRoutes> = [new SocketRoute(), new ApiRoute()];

export default RouterList;
