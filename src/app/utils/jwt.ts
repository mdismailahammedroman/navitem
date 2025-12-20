import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const generateToken = (
  Payload: JwtPayload,
  Secret: string,
  expiresIn: string
) => {
  const token = jwt.sign(Payload, Secret, {
    expiresIn,
  } as SignOptions);
  return token;
};
export const verifyToken = (token: string, secret: string) => {
  const verifiedToken = jwt.verify(token, secret);
  return verifiedToken;
};
