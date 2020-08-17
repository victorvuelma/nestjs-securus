import { Controller, Get } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomerFindDto } from './customers.dto';

@Controller('customers')
export class CustomersController {
  constructor(private _customersService: CustomersService) {}

  @Get()
  async findAll() {
    return this._customersService.find();
  }
}
