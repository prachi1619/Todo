import { SignInRequest, SignUpRequest } from "../contracts";
import { AuthController } from "../controllers";
import bodyParser from "body-parser";
import express, { Response, Request, NextFunction } from "express";

export const authRouter = express.Router();

authRouter.post(
  `/signup`,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let authController = new AuthController();
      let request: SignUpRequest = req.body;
      let response = await authController.signUp(request);
      res
        .status(200)
        .json({ message: "User Signed Up Successfully!", data: response });
    } catch (err: any) {
      next(err);
    }
  }
);

authRouter.post(
  `/signin`,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let authController = new AuthController();
      let request: SignInRequest = req.body;
      let response = await authController.signIn(request);
      res
        .status(200)
        .json({ message: "User Signed In Successfully!", data: response });
    } catch (err: any) {
      next(err);
    }
  }
);

authRouter.use(bodyParser.json());