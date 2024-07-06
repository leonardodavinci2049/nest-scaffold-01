import { IsJWT, IsStrongPassword } from 'class-validator';
//import { Role } from 'src/core/enums/role.enum';

export class ResetAuthDto {
  @IsStrongPassword({ minLength: 6 }, { message: 'Password is too weak' })
  SENHA?: string;

  @IsJWT()
  token: string;
}
