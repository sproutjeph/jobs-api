import cors from "cors";
import helmet from "helmet";
const xss = require("xss-clean");
// const rateLimiter = require("rate-limiter");
require("express-async-errors");
import authMidleware from "./middlewares/auth.middleware";
import express, { Application } from "express";
const app: Application = express();
import authRouter from "./routes/auth.route";
import jobsRouter from "./routes/jobs.route";
import { ErrorHandlerMiddleware, NotFoundMiddleware } from "./middlewares";

// app.set("trust proxy", 1);
// app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(xss());

app.get("/*", (req, res) => {
  res.send("<h1>Jobs API</h1>");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authMidleware, jobsRouter);

app.use(NotFoundMiddleware);
app.use(ErrorHandlerMiddleware);

export default app;
