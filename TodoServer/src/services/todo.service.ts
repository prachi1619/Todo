import {
  CreateTodoContractRequest,
  CreateTodoContractResponse,
  DeleteTodoContractRequest,
  DeleteTodoContractResponse,
  GetTodoContractAllResponse,
  GetTodoContractByIdRequest,
  GetTodoContractByIdResponse,
  UpdateTodoContractRequest,
  UpdateTodoContractResponse,
} from "../contracts";
import { db } from "../database/db";
import { Mapper } from "../mapper";

export class TodoService {
  public _todoRepository = db.todo;

  public async getAllTodos(userId:number): Promise<GetTodoContractAllResponse> {
    const dbResponse = await this._todoRepository.getAllTodos(userId);
    if (dbResponse.length === 0) {
      const response = new GetTodoContractAllResponse();
      return response;
    }
    const mapperResponse = Mapper.getAllTodo(dbResponse);
    return mapperResponse;
  }

  public async getTodoById(
    request: GetTodoContractByIdRequest
  ): Promise<GetTodoContractByIdResponse> {
    const dbResponse = await this._todoRepository.getTodoById(request);
    if (!dbResponse) {
      const response = new GetTodoContractByIdResponse();
      response.message = "No Todo found!";
      return response;
    }
    const mapperResponse = Mapper.getTodoById(dbResponse);
    mapperResponse.message = "FindOne";
    return mapperResponse;
  }

  public async createTodo(
    request: CreateTodoContractRequest
  ): Promise<CreateTodoContractResponse> {
    const response = new CreateTodoContractResponse();

    const dbResponse = await this._todoRepository.createTodo(request);

    if (dbResponse) {
      return dbResponse as any;
    } else {
      response.message = "Error in creating Todo!";
      return response;
    }
  }

  public async updateTodo(
    request: UpdateTodoContractRequest
  ): Promise<UpdateTodoContractResponse> {
    const response = new UpdateTodoContractResponse();

    const findTodo = await this._todoRepository.getTodoById(request);

    if (!findTodo) {
      response.message = "No Todo found!";
      return response;
    }
    const dbResponse = await this._todoRepository.updateTodo(request);

    if (dbResponse) {
      response.message = "Todo updated successfully!";
      return response;
    } else {
      response.message = "Error in updating Todo!";
      return response;
    }
  }

  public async deleteTodo(
    request: DeleteTodoContractRequest
  ): Promise<DeleteTodoContractResponse> {
    const response = new DeleteTodoContractResponse();

    const findTodo = await this._todoRepository.getTodoById(request);
    if (!findTodo) {
      response.message = "No Todo found!";
      return response;
    }

    const dbResponse = await this._todoRepository.deleteTodo(request);

    if (dbResponse) {
      response.message = "Todo deleted successfully!";
      return response;
    } else {
      response.message = "Error in deleting Todo!";
      return response;
    }
  }

}