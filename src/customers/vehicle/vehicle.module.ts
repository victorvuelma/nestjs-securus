import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [VehicleController],
  providers: [VehicleService, PrismaService],
})
export class VehicleModule {}
