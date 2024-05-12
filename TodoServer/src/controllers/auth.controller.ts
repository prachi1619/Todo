import { SignInRequest, SignUpRequest } from '../contracts';
import { AuthService } from '../services';

export class AuthController {
  public authService = new AuthService();

  public signUp = async (request: SignUpRequest) => {
    const signUp = await this.authService.signUp(request);
    return signUp;
  };

  public signIn = async (request: SignInRequest) => {
    const signIn = await this.authService.signIn(request);
    return signIn;
  };
  
}