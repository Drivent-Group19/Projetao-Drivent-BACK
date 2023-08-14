import { Request, Response } from "express";

export async function getFirst(req: Request, res: Response) {
  const { user } = res.locals;
  console.log('first GEt', user);
  return res.send(user);
}