import express from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getSingleJob,
  updateJob,
} from "../controllers/jobs.controller";
const router = express.Router();

router.route("/").post(createJob);
router.route("/").get(getAllJobs);
router.route("/:id").get(getSingleJob);
router.route("/:id").delete(deleteJob);
router.route("/:id").patch(updateJob);

export default router;
