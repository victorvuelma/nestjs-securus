import { Controller, Post, Body } from '@nestjs/common';
import { LoginPayload } from './auth.payload';
import { AuthService } from './auth.service';

@Controller('customers/auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post('')
  async login(@Body() loginPayload: LoginPayload) {
    return this._authService.login(loginPayload);
  }
}
