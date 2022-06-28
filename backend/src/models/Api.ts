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
  method: number;
  url: string;
  desc: string;
  published: boolean;
  structure: ApiDetailDocument;
  createdAt: Date;
  updatedAt: Date;
}

const ApiSchema = new mongoose.Schema<ApiDocument>(
  {
    method: { type: Number, required: true },
    url: { type: String, required: true },
    desc: { type: String },
    published: { type: Boolean, default: false },
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
