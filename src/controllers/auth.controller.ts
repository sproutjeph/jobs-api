import { Request, Response } from "express";
import UserModel from "../models/User.model";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { BadRequestError, UnathuenticatedError } from "../errors";
const register = async (req: Request, res: Response) => {
  const user = await UserModel.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("please provide email and Password");
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new UnathuenticatedError("invalid Credentail");
  }
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnathuenticatedError("invalid Credentail");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

export { register, login };
