import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomersService } from '../customers.service';

@Module({
  providers: [AuthService, PrismaService, CustomersService],
  controllers: [AuthController],
})
export class AuthModule {}
