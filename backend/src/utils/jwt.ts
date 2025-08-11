import jwt from "jsonwebtoken";
import { IUserToken } from "./interface";
import moment from "moment-timezone";

export const generateToken = (user: IUserToken): string => {
  const secretKey = process.env.SECRET_KEY || ""; // ambil SECRET_KEY dari .env

  // Expired 1 jam dari sekarang di zona waktu Jakarta
  const exp = moment.tz("Asia/Jakarta").add(1, "hours").unix();

  // generate token
  const token = jwt.sign({ ...user, exp }, secretKey);

  return token;
};

export const getUserData = (token: string) => {
  const secretKey = process.env.SECRET_KEY || ""; // ambil SECRET_KEY dari .env

  const user = jwt.verify(token, secretKey) as IUserToken;

  return user;
};
