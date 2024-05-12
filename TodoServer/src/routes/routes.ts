import { Application } from "express";
import { todoRouter } from "./todo.routes";
import { authRouter } from "./auth.routes";
import { authMiddleware } from "../middlewares";

export const registerAuthRoutes = async (app: Application) => {
  app.use("/api/v1", authRouter);
};

export const registerProtectedRoutes = async (app: Application) => {
  app.use(authMiddleware);
  app.use("/api/v1/todo", todoRouter);
};