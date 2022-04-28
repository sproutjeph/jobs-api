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
// import swaggerUI from "swagger-ui-express";
// const YAML = require("yamljs");
// const swaggerDocument = YAML.load("./swagger.yaml");
// app.set("trust proxy", 1);
// app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(xss());

app.get("/", (req, res) => {
  res.send("<h1>Jobs API</h1><a href='/api-docs'>Documentation</a>");
});
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authMidleware, jobsRouter);

app.use(NotFoundMiddleware);
app.use(ErrorHandlerMiddleware);

export default app;
