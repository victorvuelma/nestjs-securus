import { IsNotEmpty } from 'class-validator';

export class CustomerVehicle {
  id: number;
  customerId: number;

  variationId: number;

  sign: string;

  createdAt: Date;

  updatedAt: Date;
}

export class CustomerVehicleFindDto {
  @IsNotEmpty()
  customerId: number;

  @IsNotEmpty()
  sign: string;
}
