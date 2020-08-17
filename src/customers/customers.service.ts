import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Customer } from '@prisma/client';
import { CustomerFindDto } from './customers.dto';

@Injectable()
export class CustomersService {
  constructor(private _prismaService: PrismaService) {}

  async find(filter?: CustomerFindDto): Promise<Customer[]> {
    const customers = await this._prismaService.customer.findMany({
      where: filter,
      first: 1,
    });

    return customers;
  }
}
