import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  //private readonly logger = new Logger('ProductsService');
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.prisma.tbl_system_usuario.create({
        data: {
          EMAIL_DE_LOGIN: createUserDto.EMAIL_DE_LOGIN,
          NOME: createUserDto.NOME,
          SENHA: createUserDto.SENHA,
        },
        select: {
          ID_USUARIO_SYSTEM: true,
          EMAIL_DE_LOGIN: true,
          NOME: true,
        },
      });

      return { user };
    } catch (error) {}
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
