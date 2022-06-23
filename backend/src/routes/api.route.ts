import apiController from "../controllers/api.controller";
import BaseRoutes from "./base.route";

class ApiRoute extends BaseRoutes {
  url: string = "documentation";
  routes(): void {
    this.router.get("/", apiController.get_apis)
    this.router.post("/", apiController.insert_api)
    this.router.put("/", apiController.update_api)
    this.router.delete("/", apiController.delete_api)
  }
}

export default ApiRoute