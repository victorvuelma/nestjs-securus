import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { RavenModule, RavenInterceptor } from 'nest-raven';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RavenModule,
    CustomersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, {
    provide: APP_INTERCEPTOR,
    useValue: new RavenInterceptor()
  }]
})
export class AppModule {}
