import { compare, genSalt, hash } from "bcrypt";
import { isEmpty } from "../utils/util";
import httpStatus from "http-status";
import { AuthContractToModelConverter as AC2M } from "../mapper";
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  TokenDataResponse,
  User,
} from "../contracts";
import { db } from "../database/db";
import { HttpException, createLoginToken } from "../utils";

export class AuthService {
  public _authRepository = db.auth;

  public async signUp(request: SignUpRequest): Promise<SignUpResponse> {
    if (isEmpty(request))
      throw new HttpException(httpStatus.BAD_REQUEST, "request is empty");

    const findUser: SignUpResponse | null =
      await this._authRepository.findUserByEmail(request.email);

    if (findUser)
      throw new HttpException(
        409,
        `This email ${request.email} already exists`
      );

    if (request.password !== request.confirmPassword)
      throw new HttpException(
        400,
        `The password and confirm password do not match. Please make sure to enter the same password in both fields.`
      );

    const saltRounds = 10;
    const saltPassword = await genSalt(saltRounds);

    const hashedPassword = await hash(request.password, saltPassword);

    request.password = hashedPassword;

    const SignUpResponse = await this._authRepository.signup(request);

    let mapperResponse = AC2M.toSignupResponse(SignUpResponse);

    return mapperResponse as SignUpResponse;
  }

  public async signIn(request: SignInRequest): Promise<SignInResponse> {
    if (isEmpty(request)) throw new HttpException(400, "userData is empty");

    const findUser = await this._authRepository.findUserByEmail(request.email);

    if (!findUser)
      throw new HttpException(409, `This email ${request.email} was not found`);

    const isPasswordMatching: boolean = await compare(
      request.password,
      findUser.password as string
    );

    if (!isPasswordMatching)
      throw new HttpException(409, "Password not matching");

    const tokenData: TokenDataResponse = createLoginToken(findUser as User);

    const response: SignInResponse = { token: tokenData.token };

    return response;
  }

}