import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { CustomersController } from './customers/customers.controller';
import { CustomersService } from './customers/customers.service';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [CustomersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
