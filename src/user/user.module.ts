import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule, PrismaModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
