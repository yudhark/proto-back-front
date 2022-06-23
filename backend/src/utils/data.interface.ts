interface IMethodHttp {
  id: number;
  name: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS";
  desc?: string;
}
export const http_method: Array<IMethodHttp> = [
  { id: 0, name: "GET", desc: "" },
  { id: 1, name: "POST", desc: "" },
  { id: 2, name: "DELETE", desc: "" },
  { id: 3, name: "PUT", desc: "" },
  { id: 4, name: "PATCH", desc: "" },
  { id: 5, name: "OPTIONS", desc: "" },
];
