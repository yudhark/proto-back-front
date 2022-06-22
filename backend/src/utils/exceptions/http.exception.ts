class HttpException extends Error {
  public status: number;
  public message: string;
  public success: boolean;

  constructor(status: number, success: boolean, message: string) {
    super(message);
    this.status = status;
    this.success = success;
    this.message = message;
  }
}

export default HttpException
