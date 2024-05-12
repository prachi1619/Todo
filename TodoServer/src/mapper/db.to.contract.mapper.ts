import {
  GetTodoContractAllResponse,
  GetTodoContractByIdResponse,
  TodoContract,
} from "../contracts";
import { todoDto } from "../dtos";

export class Mapper {
  
  static getTodoById(dbResponse: todoDto): GetTodoContractByIdResponse {
    const response = new GetTodoContractByIdResponse();
    response.response = {
      id: dbResponse.id,
      text: dbResponse.text,
      isDone: dbResponse.is_done,
      isActive: dbResponse.is_active,
      createdAt: dbResponse.created_at,
      updatedAt: dbResponse.updated_at,
      createdBy: dbResponse.created_by,
      updatedBy: dbResponse.updated_by,
    };
    return response;
  }

  static getAllTodo(arrayOfDbResponse: todoDto[]): GetTodoContractAllResponse {
    const response = new GetTodoContractAllResponse();

    arrayOfDbResponse.map((dbResponse: todoDto) => {
      const todo = new TodoContract();
      todo.id = dbResponse.id;
      todo.text = dbResponse.text;
      todo.isDone = dbResponse.is_done;
      todo.isActive = dbResponse.is_active;
      todo.createdAt = dbResponse.created_at;
      todo.updatedAt = dbResponse.updated_at;
      todo.createdBy = dbResponse.created_by;
      todo.updatedBy = dbResponse.updated_by;
      response.push(todo);
      return todo;
    });
    return response;
  }

}