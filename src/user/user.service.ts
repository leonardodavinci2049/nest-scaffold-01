import { Injectable, NotFoundException } from '@nestjs/common';

import { v4 as UuidV4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
//import mysql from 'mysql2/promise';
import * as bcrypt from 'bcrypt';
import { envs } from 'src/core/config';
import { createConnection, Connection } from 'mysql2/promise';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  private connection: Connection;
  constructor(
    private readonly prisma: PrismaService,
    private readonly dbService: DatabaseService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      //   const salt = await bcrypt.genSalt(10);

      //  console.log('salt: ' + salt);
      const password = await bcrypt.hash(createUserDto.SENHA, 10);

      const offset = new Date().getTimezoneOffset() * 60000;
      createUserDto.DATADOCADASTRO = new Date(Date.now() - offset);
      createUserDto.DT_UPDATE = new Date(Date.now() - offset);

      createUserDto.ID_UUID = UuidV4();

      // console.log(createUserDto.EMAIL_DE_LOGIN, createUserDto.SENHA, password);

      return await this.prisma.tbl_system_usuario.create({
        data: {
          ID_UUID: createUserDto.ID_UUID,
          ID_SYSTEM_CFG_CLIENTE: createUserDto.ID_SYSTEM_CFG_CLIENTE,
          ID_PESSOA: createUserDto.ID_PESSOA,
          LOGIN: createUserDto.LOGIN,
          NOME: createUserDto.NOME,
          EMAIL_DE_LOGIN: createUserDto.EMAIL_DE_LOGIN,
          SENHA: password,
          //  ROLE: createUserDto.ROLE,
          DATADOCADASTRO: createUserDto.DATADOCADASTRO,
          DT_UPDATE: createUserDto.DT_UPDATE,
        },
        select: {
          ID_UUID: true,
          ID_USUARIO_SYSTEM: true,
          ID_SYSTEM_CFG_CLIENTE: true,
          NOME: true,
          // ROLE: true,
          EMAIL_DE_LOGIN: true,
          DATADOCADASTRO: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  // USANDO PRISMA
  async findAll() {
    try {
      return this.prisma.tbl_system_usuario.findMany({
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
      });
    } catch (err) {
      console.log(err);
    } finally {
      console.log('FECHOU A CONEXÃO 1');
    }
  }

  // USANDO MYSQL2 COM MODULO
  async findAll1() {
    try {
      const connection = this.dbService.getConnection();
      console.log('ABRIU CONEXÃO 1');
      //[rows]
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

      // console.log(rows); // results contains rows returned by server
      // console.log(fields); // fields cont

      return rows;
    } catch (err) {
      console.log(err);
    } finally {
      console.log('FECHOU A CONEXÃO 1');
      //this.connection.end();
    }
  }
  // USANDO MYSQL2 SEN MODULO
  async findAll2() {
    console.log('connection: aqui 1 ');

    //  const connection = this.dbService.getConnection();

    this.connection = await createConnection({
      port: 3306,
      host: envs.DB_MYSQL_HOST,
      user: envs.DB_MYSQL_ROOT,
      password: envs.DB_MYSQL_ROOT_PASSWORD,
      database: envs.DB_MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      pool: true,
    });

    try {
      console.log('ABRIU CONEXÃO 1');
      //[rows]
      const [rows] = await this.connection.query(`
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

      // console.log(rows); // results contains rows returned by server
      // console.log(fields); // fields cont

      return rows;
    } catch (err) {
      console.log(err);
    } finally {
      console.log('FECHOU A CONEXÃO 1');
      this.connection.end();
    }
  }

  async findAll3() {
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

    //this.dbService.close();
    //this.dbService.connect();
    console.log('connection: aqui 1 ');

    //  const connection = this.dbService.getConnection();

    this.connection = await createConnection({
      port: 3306,
      host: envs.DB_MYSQL_HOST,
      user: envs.DB_MYSQL_ROOT,
      password: envs.DB_MYSQL_ROOT_PASSWORD,
      database: envs.DB_MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      pool: true,
    });

    try {
      console.log('ABRIU CONEXÃO 1');
      //[rows]
      const [rows] = await this.connection.query(`
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

      // console.log(rows); // results contains rows returned by server
      // console.log(fields); // fields cont

      return rows;
    } catch (err) {
      console.log(err);
    } finally {
      console.log('FECHOU A CONEXÃO 1');
      this.connection.end();
    }
  }

  async findAll4() {
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

    //this.dbService.close();
    //this.dbService.connect();
    console.log('connection: aqui 1 ');

    //  const connection = this.dbService.getConnection();

    this.connection = await createConnection({
      port: 3306,
      host: envs.DB_MYSQL_HOST,
      user: envs.DB_MYSQL_ROOT,
      password: envs.DB_MYSQL_ROOT_PASSWORD,
      database: envs.DB_MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      pool: true,
    });

    try {
      console.log('ABRIU CONEXÃO 1');
      //[rows]
      const [rows] = await this.connection.query(`
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

      // console.log(rows); // results contains rows returned by server
      // console.log(fields); // fields cont

      return rows;
    } catch (err) {
      console.log(err);
    } finally {
      console.log('FECHOU A CONEXÃO 1');
      this.connection.end();
    }
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
        ROLE: true,
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
