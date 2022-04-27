import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./customAPIError";

class BadRequestError extends CustomAPIError {
  constructor(message: any) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;
