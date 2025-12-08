import { Request, Response } from "express";

import * as authService from "../services/auth.service";
import { formatApiResponse } from "../utils/api.utils";


export const registerUser = async (req: Request, res: Response) => {
  const userIp = req.ip;
  const userAgent = req.headers["user-agent"]; 

  const result = await authService.registerUser({
    userDTO: req.body,
    userIp,
    userAgent,
  });

  res.json(formatApiResponse({ data: result }));
};

export const loginUser = async () => {};
