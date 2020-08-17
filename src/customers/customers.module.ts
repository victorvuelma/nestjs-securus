import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService, PrismaService],
  imports: [AuthModule],
})
export class CustomersModule {}
