type ResType = {
  mode: "error" | "success" | "failed" | "custom";
  message?: string;
  data?: any;
};
export const response_object = ({ mode, message, data }: ResType) => {
  switch (mode) {
    case "error":
      return { success: false, message: "Something Went Wrong", data };
    case "success":
      return { success: true, message, data };
    case "failed":
      return { success: false, message, data };
    default:
      return { success: true, message: "OK" };
  }
};
