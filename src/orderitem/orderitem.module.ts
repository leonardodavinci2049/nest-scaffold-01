import { Module } from '@nestjs/common';
import { OrderitemService } from './orderitem.service';
import { OrderitemController } from './orderitem.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderitemController],
  providers: [OrderitemService],
})
export class OrderitemModule {}
