import { BaseResponse } from "./base.contract";

/* ---------------------------------- Todo ---------------------------------- */

export class TodoContract {
  public id!: number;
  public text!: string;
  public isDone!: boolean;
  public isActive!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
  public createdBy!: number;
  public updatedBy!: number;
}

/* --------------------------------- GetAll --------------------------------- */

export class GetTodoContractAllResponse extends Array<TodoContract> {}

/* --------------------------------- GetById -------------------------------- */

export class GetTodoContractByIdRequest {
  public id!: number;
}

export class GetTodoContractByIdResponse extends BaseResponse {
  public response!: TodoContract;
}

/* --------------------------------- Create --------------------------------- */

export class CreateTodoContractRequest extends TodoContract {}

export class CreateTodoContractResponse extends BaseResponse {}

/* --------------------------------- Update --------------------------------- */

export class UpdateTodoContractRequest extends TodoContract {
  public id!: number;
}

export class UpdateTodoContractResponse extends BaseResponse {}

/* --------------------------------- Delete --------------------------------- */

export class DeleteTodoContractRequest {
  public id!: number;
}

export class DeleteTodoContractResponse extends BaseResponse {}