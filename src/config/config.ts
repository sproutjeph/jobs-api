import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI as string;
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_LIFETIME = process.env.JWT_LIFETIME;
const config = {
  MONGODB_URI,
  port: PORT,
  JWT_SECRET,
  JWT_LIFETIME,
};

export default config;
