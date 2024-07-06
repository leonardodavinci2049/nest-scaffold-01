import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
//import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest(); // o objetivo é pegar o token do header da requisição
      const token = request.headers.authorization.split(' ')[1]; // o token é passado no header da requisição
      // console.log('ZZZZZZZZZZZ ' + request.userRequest);
      if (!token) {
        return false;
      }

      // retorna o payload - foi escolhido checkToken
      // em vez de is validToken porque retorna mais dados
      const payload = this.authService.checkToken(token);
      //cria essa propriedade chamada tokenPayload  no HEAD do request e nela
      // é inserido o payload,  para ser usada em outros lugares
      request.tokenPayload = payload;
      // cria essa propriedade chamada userRequest  no HEAD do request e nela
      // é inserido os dados do usuário,  para ser usado em outros lugares
      request.userRequest = await this.userService.findOne(payload.id);
      // console.log('XXXXXXXXXXX ' + request.userRequest);

      return true;
    } catch (error) {
      return false;
    }
  }
}
