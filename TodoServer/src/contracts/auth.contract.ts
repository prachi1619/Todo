/* --------------------------------- Sign Up -------------------------------- */

export class SignUpRequest{
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public isActive!: boolean;
  public password!: string;
  public confirmPassword!: string;
}

export class SignUpResponse{
  public id?: number;
  public firstName?: string;
  public lastName?: string;
  public email!: string;
  public password?: string;
  public isActive?: boolean;
  public createdAt?: Date;
  public updatedAt?: Date;
}

/* --------------------------------- SignIn --------------------------------- */
export class SignInRequest{
  public email!: string;
  public password!: string;
  public confirmPassword!: string;
}

export class SignInResponse {
  public token!: string;
}

/* ---------------------------------- Token --------------------------------- */

export class DataStoredInToken {
  id?: number;
}

export class TokenDataResponse{
  public token!: string;
  public expiresIn!: number;
}