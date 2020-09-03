import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthLoginDto, AuthCustomerInit, AuthCustomerCheck } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post('customers/login')
  async customerLogin(@Body() authLogin: AuthLoginDto) {
    try {
      const { token, customer } = await this._authService.login(authLogin);

      return {
        access_token: token,
        customer,
      };
    } catch (error) {
      console.error(error);

      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Invalid user or password.',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('customers/init')
  async customerInit(@Body() customerLogin: AuthCustomerInit) {
    try {
      const customerData = await this._authService.customerInit(customerLogin);

      return customerData;
    } catch (error) {
      console.error(error);

      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'User not found.',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('customers/check')
  async customerCheck(@Body() customerCheck: AuthCustomerCheck) {
    try {
      const { token, customer } = await this._authService.customerCheck(
        customerCheck,
      );

      return {
        access_token: token,
        customer,
      };
    } catch (error) {
      console.error(error);

      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'User not found.',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
