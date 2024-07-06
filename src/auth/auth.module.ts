import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaModule } from 'src/core/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';

import { envs } from 'src/core/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: envs.APP_JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
