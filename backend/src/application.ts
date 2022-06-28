import express, { Application } from "express";
import cors, {CorsOptions} from "cors"
import RouterList from "./routes/route.list";
import config from "config"
import logger from "./log";
import error_middleware from "./middlewares/error.middleware";
import morgan from "morgan"
import DB from "./db";

const base_path: string = config.get<string>("api_path");
const cors_options = config.get<CorsOptions>("cors")
class App {
  private app: Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.plugins();
    this.init_error_handler();
    this.initialize_database()
    this.routes();
  }

  protected plugins(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors({origin: "*"}))
    this.app.use(morgan("dev"))
  }

  protected init_error_handler(): void {
    this.app.use(error_middleware)
  }

  protected async initialize_database(): Promise<void> {
    const dbs = new DB();
    await dbs.connection()
  }

  protected routes(): void {
    RouterList.forEach((router) => this.app.use(base_path + "/" + router.url, router.router));
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      logger.info("Server is Running on Port " + this.port);
    });
  }
}

export default App;
