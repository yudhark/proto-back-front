import { Request, Response } from "express";
import path from "path";
import BaseRoutes from "./base.route";

class SocketRoute extends BaseRoutes {
  url: string = "maps";
  routes(): void {
    this.router.get("/", (req: Request, res: Response) => {
      const current_path = path.resolve(__dirname, "../");
      return res.sendFile("/views/index.html", { root: current_path });
    });
  }
}

export default SocketRoute;
