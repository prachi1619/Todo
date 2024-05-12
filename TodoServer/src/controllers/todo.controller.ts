import { CreateTodoContractRequest, DeleteTodoContractRequest, GetTodoContractByIdRequest, UpdateTodoContractRequest } from "../contracts";
import { TodoService } from "../services";

export class TodoController {
  public _todoService = new TodoService();

  public getAllTodos = async (userId:number) => {
    let response = await this._todoService.getAllTodos(userId);
    return response;
  };

  public getTodoById = async (request: GetTodoContractByIdRequest) => {
    const response = await this._todoService.getTodoById(request);
    return response;
  };

  public createTodo = async (request: CreateTodoContractRequest) => {
    const response = await this._todoService.createTodo(request);
    return response;
  };

  public updateTodo = async (request: UpdateTodoContractRequest) => {
    const response = await this._todoService.updateTodo(request);
    return response;
  };

  public deleteTodo = async (request: DeleteTodoContractRequest) => {
    const response = await this._todoService.deleteTodo(request);
    return response;
  };

}