import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthLoginDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('customers/auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post('')
  async login(@Body() authLogin: AuthLoginDto) {
    try {
      const {token, customer} = await this._authService.login(authLogin);

      return {
        access_token: token,
        customer
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
}
