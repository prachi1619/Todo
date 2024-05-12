import express from "express";
import bodyParser from "body-parser";
import { NextFunction, Response, Request } from "express";
import { TodoController } from "../controllers";
import {
  CreateTodoContractRequest,
  DeleteTodoContractRequest,
  GetTodoContractByIdRequest,
  RequestWithUser,
  UpdateTodoContractRequest,
} from "../contracts";

export const todoRouter = express.Router();

todoRouter.use(bodyParser.json());

todoRouter.get(
  `/list`,
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      let todoController = new TodoController();
      const userId = (req.user as { id: number }).id;
      let response = await todoController.getAllTodos(userId);
      res.status(200).json({ data: response });
    } catch (err: any) {
      next(err);
    }
  }
);

todoRouter.get(
  `/:id`,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let todoController = new TodoController();
      let request = new GetTodoContractByIdRequest();
      request.id = Number(req.params.id);
      let response = await todoController.getTodoById(request);
      res.status(200).json({ data: response });
    } catch (err: any) {
      next(err);
    }
  }
);

todoRouter.post(
  `/`,
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      let todoController = new TodoController();
      let request: CreateTodoContractRequest = req.body;
      request.createdBy = (req.user as { id: number }).id;
      request.updatedBy = (req.user as { id: number }).id;
      let response = await todoController.createTodo(request);
      res.status(200).json({ response: response });
    } catch (err: any) {
      next(err);
    }
  }
);

todoRouter.put(
  `/:id`,
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      let todoController = new TodoController();
      let request = new UpdateTodoContractRequest();
      request = req.body;
      request.id = Number(req.params.id);
      request.updatedBy = (req.user as { id: number }).id;
      let response = await todoController.updateTodo(request);
      res.status(200).json({ data: response });
    } catch (err: any) {
      next(err);
    }
  }
);

todoRouter.delete(
  `/:id`,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let todoController = new TodoController();
      let request = new DeleteTodoContractRequest();
      request.id = Number(req.params.id);
      let response = await todoController.deleteTodo(request);
      res.status(200).json({ data: response });
    } catch (err: any) {
      next(err);
    }
  }
);