import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./customAPIError";

class NotFoundError extends CustomAPIError {
  constructor(message: any) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
