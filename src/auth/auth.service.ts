import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/core/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  private issuer = 'http://localhost.com';
  private audience = 'user';

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  createToken(user: RegisterAuthDto) {
    return {
      accessToken: this.jwtService.sign(
        {
          //Payload
          id: user.ID_USUARIO_SYSTEM,
        },
        {
          //options
          expiresIn: '7 days',
          subject: user.ID_USUARIO_SYSTEM.toString(),
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.issuer, //verifica se o token foi emitido pelo servidor
        audience: this.audience, // verifica se o token é para o usuário
      });

      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  isValidToken(token: string) {
    // rota que válida o token
    try {
      this.checkToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }

  async validateUser(payload: any) {
    return await this.prisma.tbl_system_usuario.findFirst({
      where: {
        ID_USUARIO_SYSTEM: payload.id,
      },
    });
  }

  async register(registerAuthDto: RegisterAuthDto) {
    const userRegister = await this.userService.create(registerAuthDto);

    return this.createToken(userRegister);
  }

  async login(loginAuthDto: LoginAuthDto) {
    //const password = await bcrypt.hash(loginAuthDto.SENHA, 10);
    console.log(loginAuthDto.EMAIL_DE_LOGIN, loginAuthDto.SENHA);
    const userLogin = await this.prisma.tbl_system_usuario.findFirst({
      where: {
        EMAIL_DE_LOGIN: loginAuthDto.EMAIL_DE_LOGIN,
      },
    });

    if (!userLogin) {
      throw new UnauthorizedException('Login e/ou Senha Incorretos.');
    }

    if (!(await bcrypt.compare(loginAuthDto.SENHA, userLogin.SENHA))) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos.');
    }

    // console.log(userLogin);

    return this.createToken(userLogin);
    //return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.prisma.tbl_system_usuario.findFirst({
      where: {
        EMAIL_DE_LOGIN: email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email incorreto');
    }

    /*   
    const token = this.jwtService.sign({
      id: user.ID_SYSTEM_CFG_CLIENTE
  }, {
      expiresIn: "30 minutes",
      subject: String(user.ID_SYSTEM_CFG_CLIENTE),
      issuer: 'forget',
      audience: 'users',
  }); */
    /* 
  await this.mailer.sendMail({
      subject: 'Recuperação de Senha',
      to: 'joao@hcode.com.br',
      template: 'forget',
      context: {
          name: user.name,
          token
      }
  }); */

    return true;
  }

  async reset(password: string, token: string) {
    // To do: implementar a verificação do token
    try {
      const data: any = this.jwtService.verify(token, {
        issuer: this.issuer,
        audience: this.audience,
      });

      if (isNaN(Number(data.id))) {
        throw new BadRequestException('Token é inválido.');
      }

      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(password, salt);

      const userPasswordReset = await this.prisma.tbl_system_usuario.update({
        where: {
          ID_USUARIO_SYSTEM: Number(data.id),
        },
        data: {
          SENHA: password,
        },
      });
      return this.createToken(userPasswordReset);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
