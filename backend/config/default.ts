import {CorsOptions} from "cors"

interface IConfig {
  port: number
  host: string
  mongo_uri: string
  mongo_uri_dev: string
  env: string
  cors: CorsOptions
  api_path: string
  salt_work_factor: number,
  access_token_ttl: string | number,
  refresh_token_ttl: string | number,
  access_token_private_key: string,
  access_token_public_key: string,
  refresh_token_private_key: string,
  refresh_token_public_key: string,
}

const config: IConfig = {
  port: 5000,
  host: "localhost",
  mongo_uri: "",
  mongo_uri_dev: "",
  env: "development",
  cors: {
    origin: "http://localhost:3000/",
    methods: "GET,POST,PATCH,DELETE,OPTIONS"
  },
  api_path: "/api/v1",
  salt_work_factor: 10,
  access_token_ttl: "15m",
  refresh_token_ttl: "30d",
  access_token_private_key: "",
  access_token_public_key: "",
  refresh_token_private_key: "",
  refresh_token_public_key: "",
};

export default config;
