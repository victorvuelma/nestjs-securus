import {
  Controller,
  Get,
  Query,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('customers/vehicle')
export class VehicleController {
  constructor(private _vehicleService: VehicleService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async find(@Req() req, @Query() query) {
    const {
      customer: { id: customerId },
    } = req.user;

    const [vehicle] = await this._vehicleService.find({
      customerId,
      sign: query.sign,
    });

    if (!vehicle) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Vehicle not found.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return vehicle;
  }
}
