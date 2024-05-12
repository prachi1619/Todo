import { SignUpRequest, SignUpResponse } from "../contracts";
import { IDatabase, IMain } from "pg-promise";

export class AuthRepository {
  constructor(private db: IDatabase<any>, private pgp: IMain) {}

  public async signup(request: SignUpRequest): Promise<SignUpResponse> {
    const [signup] = await this.db.query(
      `INSERT INTO public.users_account
    (first_name, last_name, email, "password", is_active, created_at,updated_at)
    VALUES($1,$2,$3,$4,$5,$6,$7)  RETURNING *`,
      [
        request.firstName,
        request.lastName,
        request.email,
        request.password,
        true,
        new Date(),
        new Date(),
      ]
    );
    return signup;
  }

  public async findUserByEmail(
    userEmail: string
  ): Promise<SignUpResponse | null> {
    const findUser: SignUpResponse | null = await this.db.oneOrNone(
      "SELECT * FROM users_account WHERE email = $1",
      [userEmail]
    );
    return findUser;
  }

}