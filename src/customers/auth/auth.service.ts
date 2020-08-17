import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';

import { LoginPayload } from './auth.payload';
import { CustomersService } from '../customers.service';
import { CustomerFindDto } from '../customers.dto';

@Injectable()
export class AuthService {
  constructor(private _customerService: CustomersService) {}

  async login(loginPayload: LoginPayload) {
    const { cpf, password } = loginPayload;

    const findDto = new CustomerFindDto();
    findDto.cpf = cpf;

    const [customer] = await this._customerService.find(findDto);

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
