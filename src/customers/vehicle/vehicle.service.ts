import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerVehicleFindDto, CustomerVehicle } from './vehicle.dto';
import { CustomerModel } from '../customers.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class VehicleService {
  constructor(private _prismaService: PrismaService) {}

  async find(filter: CustomerVehicleFindDto): Promise<CustomerVehicle[]> {
    let vehicles = await this._prismaService.customerVehicle.findMany({
      where: filter,
    });
    vehicles = plainToClass(CustomerVehicle, vehicles);

    return vehicles;
  }
}
