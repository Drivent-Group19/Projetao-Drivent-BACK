import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { fetchUserFromGitHub } from "../services/authGitHub-service";

export async function validateTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header("Authorization");
  console.log("authHeader", authHeader);
  //console.log("authHeader2", req.header);
  if (!authHeader) return res.sendStatus(httpStatus.UNAUTHORIZED);
  try {
    const token = authHeader.split(' ')[1]; // Bearer token
    const userGitHub = await fetchUserFromGitHub(token);
    res.locals.user = userGitHub;
    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}