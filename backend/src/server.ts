import App from "./application";
import dotenv from "dotenv";
dotenv.config();
import config from "config";

const port = config.get<number>("port");
const server = new App(port);
server.listen();
