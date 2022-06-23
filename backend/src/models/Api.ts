import mongoose from "mongoose";

interface QueryType {
  name: string;
  desc: string;
}

interface ResponseType {
  name: string;
  desc: string;
}

interface ApiDetailDocument {
  query: Array<QueryType>;
  params: Array<QueryType>;
  response: Array<ResponseType>;
  body: string;
}

export interface ApiDocument extends mongoose.Document {
  method: string;
  url: string;
  desc: string;
  public: boolean;
  structure: ApiDetailDocument;
  createdAt: Date;
  updatedAt: Date;
}

const ApiSchema = new mongoose.Schema<ApiDocument>(
  {
    method: { type: String, required: true },
    url: { type: String, required: true },
    desc: { type: String },
    public: { type: Boolean, default: true },
    structure: {
      query: [{ name: String, desc: String }],
      params: [{ name: String, desc: String }],
      response: [{ name: String, desc: String }],
      body: { type: String },
    },
  },
  { timestamps: true }
);

const Api = mongoose.model<ApiDocument>("api", ApiSchema);
export default Api;
