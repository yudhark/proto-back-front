import App from "./application";
import dotenv from "dotenv";
import config from "config";
dotenv.config();

const port = config.get<number>("port");
const server = new App(port);
server.listen();
