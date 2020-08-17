import { Exclude } from 'class-transformer';

import { Gender } from '@prisma/client';

export class CustomerFindDto {
  cpf?: string;
}

export class CustomerModel {
  id: number;

  cpf: string;

  @Exclude()
  password: string;

  email: string;

  name: string;

  lastname: string;

  birthDate: Date;

  gender: Gender;

  phone: string;

  cellPhone: string;

  createdAt: Date;

  updatedAt: Date;
}
