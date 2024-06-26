import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { OrderitemModule } from 'src/orderitem/orderitem.module';

@Module({
  imports: [UserModule, AuthModule, OrderitemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
