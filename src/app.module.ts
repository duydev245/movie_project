import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { APP_PIPE } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/Jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { QuanLyDatVehModule } from './quan-ly-dat-ve/quan-ly-dat-ve.module';
import { UserModule } from './user/user.module';
import { QuanLyRapModule } from './quan-ly-rap/quan-ly-rap.module';
import { QuanLyPhimModule } from './quan-ly-phim/quan-ly-phim.module';

@Module({
  imports: [AuthModule, JwtModule.register({}), ConfigModule.forRoot({
    isGlobal: true
  }), QuanLyDatVehModule, UserModule, QuanLyRapModule, QuanLyPhimModule],
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
