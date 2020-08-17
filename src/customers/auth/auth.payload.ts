import { IsNotEmpty, MinLength } from 'class-validator';
import { IsCpf } from 'src/helpers/validation.helper';

export class LoginPayload {
  @IsNotEmpty()
  @IsCpf()
  cpf: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
