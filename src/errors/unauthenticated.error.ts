import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./customAPIError";

class UnauthenticatedError extends CustomAPIError {
  constructor(message: any) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;
