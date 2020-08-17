import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerFindDto, CustomerModel } from './customers.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CustomersService {
  constructor(private _prismaService: PrismaService) {}

  async find(filter?: CustomerFindDto): Promise<CustomerModel[]> {
    let customers = await this._prismaService.customer.findMany({
      where: filter,
    });
    customers = plainToClass(CustomerModel, customers);

    return customers;
  }
}
