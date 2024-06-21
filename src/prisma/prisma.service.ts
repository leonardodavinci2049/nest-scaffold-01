import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // private readonly logger = new Logger('ProductsService');
  async onModuleInit() {
    await this.$connect();
    // await this.logger.log('Connected to the database');
  }

  //Disconnects the database
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit' as never, async () => {
      await app.close();
    });
  }
}
