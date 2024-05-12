import { sign } from "jsonwebtoken";
import { DataStoredInToken, TokenDataResponse, User } from "../contracts";

export const createLoginToken = (user: User) => {
  const dataStoredInToken: DataStoredInToken = { id: user.id };
  const secretKey = process.env.SECRET_KEY;
  const expiresIn: number = 600 * 600;
  const response = new TokenDataResponse();
  response.token = sign(dataStoredInToken, secretKey as string, { expiresIn });
  response.expiresIn = expiresIn;
  return response;
};
