import { JWT_EXPIRE_TIME, JWT_KEY } from "../config/config.js";
import jwt from "jsonwebtoken";

export const TokenEncode = (NIDNumber, user_id) => {
  const KEY = JWT_KEY
  const EXPIRE = { expiresIn: JWT_EXPIRE_TIME }
  const PAYLOAD = { NIDNumber: NIDNumber, user_id: user_id }
  return jwt.sign(PAYLOAD, KEY, EXPIRE)
}

export const TokenDecode = (token) => {
  try {
    return jwt.verify(token, JWT_KEY)
  } catch (e) {
    return null
  }
}