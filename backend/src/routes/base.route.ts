import { Router } from "express";

interface IRouter {
  url: string;
  routes(): void
}

abstract class BaseRoutes implements IRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  abstract url: string;
  abstract routes(): void
}

export default BaseRoutes