class BaseRequest {}

class BaseResponse {
  status!: string;
  hasError!: Boolean;
  message!: String;

  constructor() {
    this.status = "ok";
    this.hasError = false;
    this.message = "";
  }
}
export { BaseRequest, BaseResponse };