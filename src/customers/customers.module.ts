import { Module } from '@nestjs/common';

import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { VehicleModule } from './vehicle/vehicle.module';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService, PrismaService],
  imports: [VehicleModule],
})
export class CustomersModule {}
