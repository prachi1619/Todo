import { SignUpResponse } from "../contracts";
import { SignUpDto } from "../dtos";

export class AuthContractToModelConverter {

  public static toSignupResponse(dbResponse: SignUpDto): SignUpResponse {
    let mapperResponse = new SignUpResponse();
    mapperResponse.firstName = dbResponse.first_name;
    mapperResponse.lastName = dbResponse.last_name;
    mapperResponse.email = dbResponse.email;
    mapperResponse.isActive = dbResponse.is_active;
    return mapperResponse;
  }

}