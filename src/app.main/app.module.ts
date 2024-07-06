import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    // ConfigModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // tempo 1 minuto
        limit: 500, // 100 requisições
        ignoreUserAgents: [/googlebot/],
      },
    ]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
