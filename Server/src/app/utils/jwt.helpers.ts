import jwt, { SignOptions } from "jsonwebtoken";

const generateToken = (
  payload: object,
  secret: string,
  expiresIn: string | number
): string => {
  const options: SignOptions = {
    algorithm: "HS256",
    expiresIn: expiresIn as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, secret, options);
};

export const jwtHelpers = {
  generateToken,
};
