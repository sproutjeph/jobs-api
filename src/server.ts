import http from "http";
import app from "./app";
import connectDB from "./DB/connectDB";
import { BadRequestError } from "./errors";
import config from "./config/config";

const server = http.createServer(app);

async function startServer() {
  try {
    await connectDB(config.MONGODB_URI);
    // console.log("connected to DB succseeded");

    server.listen(config.port, () => {
      // console.log(`server is runing on PORT : ${config.port}...`);
    });
  } catch (error) {
    throw new BadRequestError("Unable To Connect To Data Base");
  }
}

startServer();
