import { Request, Response } from "express";
import JobModel from "../models/Job.model";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnathuenticatedError,
  NotFoundError,
} from "../errors";

const createJob = async (req: any, res: Response) => {
  req.body.createdBy = req.user.userId;
  const job = await JobModel.create(req.body);

  res.status(StatusCodes.OK).json({ job });
};

const getAllJobs = async (req: any, res: Response) => {
  const jobs = await JobModel.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.send({ jobs, count: jobs.length });
};
const updateJob = async (req: any, res: Response) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === "" || position === "") {
    throw new BadRequestError("Company or Position cannot be empty");
  }
  const job = await JobModel.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No Job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req: any, res: Response) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await JobModel.findOneAndDelete({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`No Job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).send();
};

const getSingleJob = async (req: any, res: Response) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await JobModel.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No Job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

export { getAllJobs, createJob, updateJob, deleteJob, getSingleJob };
