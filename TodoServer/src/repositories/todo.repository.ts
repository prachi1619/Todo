import { IDatabase, IMain } from "pg-promise";
import {
  CreateTodoContractRequest,
  DeleteTodoContractRequest,
  GetTodoContractByIdRequest,
  UpdateTodoContractRequest,
} from "../contracts";
import { todoDto } from "../dtos";

export class TodoRepository {
  constructor(private db: IDatabase<any>, private pgp: IMain) {}

  public getAllTodos = async (userId: number): Promise<todoDto[]> => {
    const response = await this.db.query(
      "SELECT * FROM todos where is_active=true and created_by=$1",
      [userId]
    );
    return response;
  };

  public getTodoById = async (
    request: GetTodoContractByIdRequest
  ): Promise<todoDto> => {
    const [response] = await this.db.query(
      "SELECT * FROM todos where id=$1 and is_active=true",
      [request.id]
    );
    return response;
  };

  public createTodo = async (
    request: CreateTodoContractRequest
  ): Promise<todoDto> => {
    const response = await this.db.query(
      `INSERT INTO public.todos
      ("text", is_done, is_active, created_at, updated_at, created_by, updated_by)
      VALUES($1,$2,$3,$4,$5,$6,$7)  RETURNING *`,
      [
        request.text,
        request.isDone,
        true,
        new Date(),
        new Date(),
        request.createdBy,
        request.updatedBy,
      ]
    );
    return response;
  };

  public updateTodo = async (
    request: UpdateTodoContractRequest
  ): Promise<todoDto> => {
    const response = await this.db.query(
      `UPDATE public.todos
      SET "text"=$1, is_done=$2, updated_at=$3,updated_by=$5
      WHERE id=$4`,
      [request.text, request.isDone, new Date(), request.id, request.updatedBy]
    );
    return response;
  };

  public deleteTodo = async (
    request: DeleteTodoContractRequest
  ): Promise<todoDto> => {
    const response = await this.db.query(
      `UPDATE public.todos
      SET is_active=false and updated_at=$2
      WHERE id=$1`,
      [request.id, new Date()]
    );
    return response;
  };
  
}