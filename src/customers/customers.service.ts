import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Customer } from '@prisma/client';

@Injectable()
export class CustomersService {

  constructor(private _prismaService: PrismaService){}

  async findAll(): Promise<Customer[]> {
    const customers = await this._prismaService.customer.findMany();

    return customers
  }

}
