import { Module } from '@nestjs/common';
import { QuanLyRapService } from './quan-ly-rap.service';
import { QuanLyRapController } from './quan-ly-rap.controller';

@Module({
  controllers: [QuanLyRapController],
  providers: [QuanLyRapService],
})
export class QuanLyRapModule {}
