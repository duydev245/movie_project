import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { APP_PIPE } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/Jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, JwtModule.register({}), ConfigModule.forRoot({
    isGlobal: true
  })],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    JwtStrategy
  ],
})
export class AppModule { }
