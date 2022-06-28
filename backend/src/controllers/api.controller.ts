import { Request, Response } from "express";
import { response_object } from "../utils/helper.util";
import logger from "../log";
import apiService from "../services/api.service";
import { http_method } from "../utils/data.interface";

class ApiController {
  public async get_apis(req: Request, res: Response): Promise<Response> {
    try {
      const apis = await apiService.get_apis({});
      return res.status(200).json(response_object({ mode: "success", message: "retrieve data", data: apis }));
    } catch (e: any) {
      logger.error(e);
      return res.status(500).json(response_object({ mode: "error" }));
    }
  }

  public async get_api(req: Request, res: Response): Promise<Response> {
    try {
      let { id } = req.query;
      const api = await apiService.get_api({ _id: id });
      return res.status(200).json(response_object({ mode: "success", message: "retrieve data", data: api }));
    } catch (e: any) {
      logger.error(e);
      return res.status(500).json(response_object({ mode: "error" }));
    }
  }

  public async insert_api(req: Request, res: Response): Promise<Response> {
    try {
      let { method, url, desc, published } = req.body;
      const exist_api = await apiService.get_api({ $and: [{ method: method }, { url: url }] });
      if (exist_api) return res.status(200).json(response_object({ mode: "failed", message: "duplicate record(s)", data: exist_api }));
      else {
        const insert_api = await apiService.insert_api({ method, url, desc, published });
        return res.status(200).json(response_object({ mode: "success", message: "insert data", data: insert_api }));
      }
    } catch (e: any) {
      logger.error(e);
      return res.status(500).json(response_object({ mode: "error" }));
    }
  }

  public async update_api(req: Request, res: Response): Promise<Response> {
    try {
      let { id } = req.query;
      let data = req.body;
      const exist_api = await apiService.get_api({ _id: id });
      if (!exist_api) return res.status(200).json(response_object({ mode: "failed", message: "no record(s)", data: id }));
      else {
        const update_api = await apiService.update_api({ _id: exist_api._id }, { ...data });
        return res.status(200).json(response_object({ mode: "success", message: "update data", data: update_api }));
      }
    } catch (e: any) {
      logger.error(e);
      return res.status(500).json(response_object({ mode: "error" }));
    }
  }

  public async delete_api(req: Request, res: Response): Promise<Response> {
    try {
      let { id } = req.query;
      let data = req.body;
      const exist_api = await apiService.get_api({ _id: id });
      if (!exist_api) return res.status(200).json(response_object({ mode: "failed", message: "no record(s)", data: id }));
      else {
        const delete_api = await apiService.delete_api({ _id: exist_api._id });
        return res.status(200).json(response_object({ mode: "success", message: "delete data", data: delete_api }));
      }
    } catch (e: any) {
      logger.error(e);
      return res.status(500).json(response_object({ mode: "error" }));
    }
  }

  public async get_methods(req: Request, res: Response): Promise<Response> {
    try {
      return res.status(200).json(response_object({mode: "success", message: "retrieve data", data: http_method}))
    } catch (e: any) {
      logger.error(e);
      return res.status(500).json(response_object({ mode: "error" }));
    }
  }
}

export default new ApiController();
