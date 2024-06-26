import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as UuidV4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';

import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dbService: DatabaseService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      //   const salt = await bcrypt.genSalt(10);

      //  console.log('salt: ' + salt);

      createUserDto.SENHA = await bcrypt.hash(createUserDto.SENHA, 10);
    } catch (error) {
      throw new NotFoundException(error.message);
    }

    const offset = new Date().getTimezoneOffset() * 60000;
    createUserDto.DATADOCADASTRO = new Date(Date.now() - offset);
    createUserDto.DT_UPDATE = new Date(Date.now() - offset);

    createUserDto.ID_UUID = UuidV4();

    return await this.prisma.tbl_system_usuario.create({
      data: {
        ID_UUID: createUserDto.ID_UUID,
        ID_SYSTEM_CFG_CLIENTE: createUserDto.ID_SYSTEM_CFG_CLIENTE,
        ID_PESSOA: createUserDto.ID_PESSOA,
        LOGIN: createUserDto.LOGIN,
        NOME: createUserDto.NOME,
        EMAIL_DE_LOGIN: createUserDto.EMAIL_DE_LOGIN,
        SENHA: createUserDto.SENHA,
        //  ROLE: createUserDto.ROLE,
        DATADOCADASTRO: createUserDto.DATADOCADASTRO,
        DT_UPDATE: createUserDto.DT_UPDATE,
      },
      select: {
        ID_USUARIO_SYSTEM: true,
        ID_SYSTEM_CFG_CLIENTE: true,
        NOME: true,
        // ROLE: true,
        EMAIL_DE_LOGIN: true,
        DATADOCADASTRO: true,
      },
    });
  }

  async findAll() {
    /*     return this.prisma.tbl_system_usuario.findMany({
      where: {
        EMAIL_DE_LOGIN: {
          contains: '@',
        },
      },
      take: 10,
      orderBy: {
        ID_USUARIO_SYSTEM: 'desc',
      },
      select: {
        ID_USUARIO_SYSTEM: true,
        ID_SYSTEM_CFG_CLIENTE: true,
        ID_PESSOA: true,
        LOGIN: true,
        NOME: true,
        EMAIL_DE_LOGIN: true,
        SENHA: true,
      },
    }); */

    const connection = this.dbService.getConnection();
    const [rows] = await connection.query(`
                                            select 
                                              ID_USUARIO_SYSTEM,
                                              ID_SYSTEM_CFG_CLIENTE,
                                              ID_PESSOA,
                                              LOGIN,
                                              NOME,
                                              EMAIL_DE_LOGIN,
                                              SENHA
                                            from 
                                              tbl_system_usuario
                                            where
                                             ID_SYSTEM_CFG_CLIENTE = 14
                                            order by ID_USUARIO_SYSTEM desc limit 2
                                            `);
    return rows;
  }

  async findOne(id: number) {
    //there is the option to use findFirst or findMany but findUnique is more performant

    if (!id) throw new NotFoundException(`User with id not found`);
    // console.log('id: ' + id);
    await this.userExists(id);

    //console.log('id3: ' + id);
    return this.prisma.tbl_system_usuario.findUnique({
      where: {
        ID_USUARIO_SYSTEM: id,
      },
      select: {
        ID_USUARIO_SYSTEM: true,
        ID_SYSTEM_CFG_CLIENTE: true,
        ID_PESSOA: true,
        LOGIN: true,
        NOME: true,
        // ROLE: true,
        EMAIL_DE_LOGIN: true,
        SENHA: true,
      },
    });
  }

  async update(id: number, data: UpdateUserDto) {
    await this.userExists(id);

    // data.SENHA = await bcrypt.hash(SENHA, 10);

    return this.prisma.tbl_system_usuario.update({
      where: {
        ID_USUARIO_SYSTEM: id,
      },
      data,
    });
  }

  async updatePartial(id: number, data: UpdateUserDto) {
    await this.userExists(id);

    if (data.NOME == null || data.NOME == '') {
      throw new NotFoundException('O nome é obrigatório.');
    }

    return this.prisma.tbl_system_usuario.update({
      data: data,
      where: {
        ID_USUARIO_SYSTEM: id,
      },
    });
  }

  async remove(id: number) {
    await this.userExists(id);

    return this.prisma.tbl_system_usuario.delete({
      where: {
        ID_USUARIO_SYSTEM: id,
      },
    });
  }

  async userExists(id: number) {
    const user = await this.prisma.tbl_system_usuario.count({
      where: {
        ID_USUARIO_SYSTEM: id,
      },
    });

    if (!user) {
      throw new NotFoundException(`O usuário ${id} não foi encontrado.`);
    }
  }
}
