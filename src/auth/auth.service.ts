import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { compare } from 'bcrypt';

import { AuthLoginDto, AuthCustomerInit, AuthCustomerCheck } from './auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerFindDto } from 'src/customers/customers.dto';
import { isSameDay } from 'date-fns';
import { throwError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private _prismaService: PrismaService,
    private _jwtService: JwtService,
  ) {}

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
    delete customer.password;

    const token = await this._jwtService.signAsync(customer);

    return { token, customer };
  }

  async customerInit(customerInit: AuthCustomerInit) {
    const { cpf } = customerInit;

    const findDto = new CustomerFindDto();
    findDto.cpf = cpf;

    const customer = await this._prismaService.customer.findOne({
      where: findDto,
    });
    if (!customer) {
      throw Error('Customer not found.');
    }

    const { name, lastname } = customer;

    return {
      name,
      lastname,
      date: new Date(),
    };
  }

  async customerCheck(customerCheck: AuthCustomerCheck) {
    const { cpf, birthDate } = customerCheck;

    const findDto = new CustomerFindDto();
    findDto.cpf = cpf;

    const customer = await this._prismaService.customer.findOne({
      where: findDto,
    });
    if (!customer) {
      throw Error('Customer not found.');
    }
    if (!isSameDay(customer.birthDate, birthDate)) {
      throw Error('Invalid birth date provided.');
    }

    delete customer.password;

    const token = await this._jwtService.signAsync(customer);

    return { token, customer };
  }
}
