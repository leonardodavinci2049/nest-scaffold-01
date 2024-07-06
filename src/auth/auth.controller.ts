import {
  Controller,
  Post,
  Body,
  Headers,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ForgetAuthDto } from './dto/forget-auth.dto';
import { ResetAuthDto } from './dto/reset-auth.dto';
import { UserDecorator } from 'src/core/decorators/user.decorator';
import { AuthGuard } from 'src/core/guards/auth.guard';

@Controller('auth/v1')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    // console.log(loginAuthDto.EMAIL_DE_LOGIN, loginAuthDto.SENHA);
    return this.authService.login(loginAuthDto);
  }

  @Post('register')
  register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Post('forget')
  forget(@Body() forgetAuthDto: ForgetAuthDto) {
    // return this.authService.create(forgetAuthDto);
  }

  @Post('reset')
  reset(@Body() resetAuthDto: ResetAuthDto) {
    // return this.authService.create(resetAuthDto);
  }

  // UseGuards(AuthGuard);
  @Post('me')
  async me(@Headers('authorization') headers) {
    //console.log('headers: ', headers.split(' ')[1]);
    try {
      const token = headers.split(' ')[1];
      return this.authService.isValidToken(token);
    } catch (e) {
      return e;
    }
  }

  @UseGuards(AuthGuard)
  @Post('checkToken')
  async checkToken(@Req() Req, @UserDecorator('ID_USUARIO_SYSTEM') user) {
    // console.log('Req.tokenPayload: ', Req.tokenPayload);
    //  Req.tokenPayload essa propriedade foi criada no jwt.auth.guard.ts
    //  O decorator @User foi criado manualmente]
    // Não precisa retornar os dados do usuário em uma verificação de token
    // O guard JwtAuthGuard é interessante porque posso colocar nos controles ou diretamente nas rotas

    // const token = headers.authorization.split(' ')[1];
    // return this.authService.checkToken( token );
    // return {message: 'Token Success', data: Req.tokenPayload, user: Req.user};

    return {
      message: 'Token Success',
      payload: Req.tokenPayload,
      user_id: user,
    };
  }
}
