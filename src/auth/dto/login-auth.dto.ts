import { IsEmail, IsOptional, IsStrongPassword } from 'class-validator';

export class LoginAuthDto {
  @IsOptional()
  LOGIN: string;

  @IsEmail({}, { message: 'Invalid email' })
  @IsOptional()
  EMAIL_DE_LOGIN: string;

  @IsStrongPassword({ minLength: 6 }, { message: 'Password is too weak' })
  SENHA?: string;
}
