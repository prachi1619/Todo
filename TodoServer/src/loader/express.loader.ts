import express, { Application } from "express";
import { json } from "body-parser";
import { registerAuthRoutes, registerProtectedRoutes } from "../routes";
import cors from "cors";
import { morganMiddleware } from "../loggers";
import { errorMiddleware } from "../middlewares/error.middleware";

export const createExpressServer = async (): Promise<Application> => {
  const app = express();
  
  app.use(json());
  
  app.use(cors());
  
  app.use(morganMiddleware);
  
  
  await registerAuthRoutes(app);
  
  await registerProtectedRoutes(app);
  
  app.use(errorMiddleware);
  return app;
};