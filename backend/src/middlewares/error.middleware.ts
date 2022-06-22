import { NextFunction, Request, Response } from "express";
import HttpException from "../utils/exceptions/http.exception";

function error_middleware(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const status = error.status || 500;
  const success = error.success || false;
  const message = error.message || "Something went wrong";

  res.status(status).json({ success, message });
}

export default error_middleware
