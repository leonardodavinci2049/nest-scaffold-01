import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
} from 'class-validator';
import { RoleEnum } from 'src/core/enums/role.enum';

//import { Role } from 'src/core/enums/role.enum';

export class CreateUserDto {
  @ApiProperty({
    required: false,
    description: 'ID_UUID',
    uniqueItems: true,
    type: 'string',
    format: 'uuid',
    example: '2d4770b3-6874-448b-87a8-b152e61d0f25',
  })
  @IsOptional()
  @IsUUID(4, { message: 'ID_UUID must be a valid UUIDv4' })
  ID_UUID;

  @ApiProperty({
    required: false,
    description: 'ID_USUARIO_SYSTEM',
    uniqueItems: true,
    type: 'number',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  ID_USUARIO_SYSTEM?: number;

  @ApiProperty()
  @IsInt()
  ID_SYSTEM_CFG_CLIENTE?: number;

  @ApiProperty()
  @IsInt()
  ID_PESSOA?: number;

  @ApiProperty({
    required: false,
    description: 'LOGIN',
    uniqueItems: true,
    type: 'string',
    example: 'joao.silva',
  })
  @IsString({ message: 'LOGIN must be a valid string', each: true })
  @ApiProperty()
  LOGIN?: string;

  @ApiProperty({
    required: false,
    description: 'NOME',
    uniqueItems: false,
    type: 'string',
    example: 'João da Silva',
  })
  @IsString({ message: 'NOME must be a valid string', each: true })
  NOME?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(RoleEnum, { message: 'ROLE must be a valid Role' })
  ROLE?: number;

  @ApiProperty()
  @IsEmail({}, { message: 'Invalid email' })
  EMAIL_DE_LOGIN: string;

  @ApiProperty({
    required: false,
    description: 'SENHA',
    uniqueItems: false,
    type: 'string',
    example: '12#3aB456',
  })
  @IsStrongPassword({ minLength: 6 }, { message: 'Password is too weak' })
  SENHA?: string;

  @ApiProperty()
  DATADOCADASTRO?: Date;

  @ApiProperty()
  DT_UPDATE?: Date;
}
