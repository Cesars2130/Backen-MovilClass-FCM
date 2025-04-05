require("dotenv").config();
import jwt from "jsonwebtoken";
import { UserRepository } from "../user/domain/userRepository/UserRepository";
import { Request, Response } from "express";
import { NextFunction } from "express";

export function verifyToken (req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader;
    if (!token) {
      return res.sendStatus(401);
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: any, user: any) => {
        console.log(req.body,"datdata")
        console.log(user);
        if (err) {
          return res.sendStatus(403); // Si el token no es válido, se devuelve un error 403 (Prohibido)
        }
     
        next();
      }
    );
  } catch (error) {}
}
