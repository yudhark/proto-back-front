import config from "config";
import dotenv from "dotenv"
dotenv.config()
import logger from "../log";
import mongoose from "mongoose";

const env = config.get<string>("env");
let mongo_uri: string = "";
if (env === "development") {
  mongo_uri = process.env.MONGO_URI || "";
} else {
  mongo_uri = process.env.MONGO_URI_DEV || "";
}
class DB {
  public async connection() {
    try {
      const connection = await mongoose.connect(mongo_uri);
      logger.info("DB is connected!");
      return connection.connection;
    } catch (e: any) {
      logger.error("DB error", e);
      process.exit(1);
    }
  }
}

export default DB;
