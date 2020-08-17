import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';

import { CustomersService } from '../customers.service';
import { CustomerFindDto } from '../customers.dto';
import { AuthLoginDto } from './auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private _prismaService: PrismaService) {}

  async login(authLogin: AuthLoginDto) {
    const { cpf, password } = authLogin;

    const findDto = new CustomerFindDto();
    findDto.cpf = cpf;

    const customer = await this._prismaService.customer.findOne({
      where: findDto,
    });
    if (!customer) {
      throw Error('Customer not found.');
    }

    const passwordMatches = await compare(password, customer.password);
    if (!passwordMatches) {
      throw Error('Invalid password.');
    }

    return true;
  }
}
