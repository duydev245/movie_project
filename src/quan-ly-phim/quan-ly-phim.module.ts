import { Module } from '@nestjs/common';
import { QuanLyPhimService } from './quan-ly-phim.service';
import { QuanLyPhimController } from './quan-ly-phim.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [QuanLyPhimController],
  providers: [QuanLyPhimService],
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get<string>('MULTER_DEST'),
      }),
      inject: [ConfigService],
    })
  ]
})
export class QuanLyPhimModule { }
