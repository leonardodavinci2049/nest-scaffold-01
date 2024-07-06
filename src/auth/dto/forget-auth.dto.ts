import { IsEmail } from 'class-validator';
//import { Role } from 'src/core/enums/role.enum';

export class ForgetAuthDto {
  @IsEmail({}, { message: 'Invalid email' })
  EMAIL_DE_LOGIN: string;
}
