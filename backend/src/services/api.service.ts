import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import Api, { ApiDocument } from "../models/Api";
import { http_method } from "../utils/data.interface";

class ApiService {
  public async get_apis(query: FilterQuery<ApiDocument>, options: QueryOptions = { lean: true }) {
    try {
      const apis = await Api.find(query, {}, options);
      return apis.map((item) => ({ ...item, methodName: http_method.filter((value) => item.method === value.id)[0].name }));
    } catch (e: any) {
      throw new Error(e);
    }
  }

  public async get_api(query: FilterQuery<ApiDocument>, options: QueryOptions = { lean: true }) {
    try {
      let api = await Api.findOne(query, {}, options);
      return api;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  public async insert_api(input: DocumentDefinition<Omit<ApiDocument, "_id" | "structure" | "createdAt" | "updatedAt">>) {
    try {
      const new_api = await Api.create(input);
      return new_api;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  public async update_api(query: FilterQuery<ApiDocument>, update: UpdateQuery<ApiDocument>, options: QueryOptions = { lean: true }) {
    try {
      const update_api = await Api.findOneAndUpdate(query, update, options);
      return update_api;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  public async delete_api(query: FilterQuery<ApiDocument>, options: QueryOptions = { lean: true }) {
    try {
      return await Api.findOneAndDelete(query, options);
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

export default new ApiService();
