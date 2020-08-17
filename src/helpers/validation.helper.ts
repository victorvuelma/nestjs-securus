import { registerDecorator, ValidationOptions } from 'class-validator';

import { isCPF, isCEP } from 'brazilian-values';

export function IsCpf() {
  return function(object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsCpf',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: 'Invalid CPF informed.',
      },
      validator: {
        validate(value: any) {
          return typeof value === 'string' && isCPF(value);
        },
      },
    });
  };
}

export function IsCep() {
  return function(object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsCep',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: 'Invalid CEP informed.',
      },
      validator: {
        validate(value: any) {
          return typeof value === 'string' && isCEP(value);
        },
      },
    });
  };
}
