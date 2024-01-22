import { Module } from '@nestjs/common';
import { QuanLyDatVehService } from './quan-ly-dat-ve.service';
import { QuanLyDatVehController } from './quan-ly-dat-ve.controller';

@Module({
  controllers: [QuanLyDatVehController],
  providers: [QuanLyDatVehService],
})
export class QuanLyDatVehModule {}
