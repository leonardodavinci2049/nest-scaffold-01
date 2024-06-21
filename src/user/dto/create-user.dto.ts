import {
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { Role } from 'src/core/enums/role.enum';

export class CreateUserDto {
  @IsInt()
  ID_SYSTEM_CFG_CLIENTE?: number;

  @IsInt()
  ID_PESSOA?: number;

  @IsString({ message: 'LOGIN must be a valid string', each: true })
  @MinLength(1)
  LOGIN?: string;

  @IsString({ message: 'NOME must be a valid string', each: true })
  NOME?: string;

  @IsOptional()
  @IsEnum(Role)
  ROLE?: number;

  @IsEmail({}, { message: 'Invalid email' })
  EMAIL_DE_LOGIN: string;

  @IsStrongPassword({ minLength: 6 }, { message: 'Password is too weak' })
  SENHA?: string;

  @IsOptional()
  DATADOCADASTRO?: Date;

  @IsOptional()
  DT_UPDATE?: Date;
}
