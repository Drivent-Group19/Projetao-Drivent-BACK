import authenticationService, { SignInParams } from "@/services/authentication-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

//import { loginUserWithGitHub } from "../services/auth-service";

export async function singInPost(req: Request, res: Response) {
  console.log('body do authentication controller', req.body);
  const { email, password } = req.body as SignInParams;
  try {
    const result = await authenticationService.signIn({ email, password });
    // responde id, email e token
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}
