import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET } = process.env;

const sign = (payload: any) => {
  return jwt.sign(payload, JWT_SECRET as string, { expiresIn: "1d" });
};

const verify = (token: string) => {
  return jwt.verify(token, JWT_SECRET as string);
};

export default {
  sign,
  verify,
};
