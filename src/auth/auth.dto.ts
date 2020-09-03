import { IsNotEmpty, MinLength, MaxDate, IsDateString } from 'class-validator';
import { endOfDay } from 'date-fns';

import { IsCpf } from 'src/helpers/validation.helper';

export class AuthLoginDto {
  @IsNotEmpty()
  @IsCpf()
  cpf: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class AuthCustomerInit {
  @IsNotEmpty()
  @IsCpf()
  cpf: string;
}

export class AuthCustomerCheck {
  @IsNotEmpty()
  @IsCpf()
  cpf: string;

  @IsNotEmpty()
  @IsDateString()
  birthDate: Date;
}
