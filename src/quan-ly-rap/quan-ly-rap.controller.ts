import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { QuanLyRapService } from './quan-ly-rap.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('QuanLyRap')
export class QuanLyRapController {
  constructor(private readonly quanLyRapService: QuanLyRapService) { }

  // API LayThongTinHeThongRap
  @ApiTags('QuanLyRap')
  @ApiResponse({ status: 200, description: 'thành công!' })
  @ApiResponse({ status: 400, description: 'lỗi...' })
  @Get('LayThongTinHeThongRap')
  heThongRapInfo(@Query('maHeThongRap') maHeThongRap: string) {
    return this.quanLyRapService.heThongRapInfo(+maHeThongRap);
  }

  // API LayThongTinCumRapTheoHeThong
  @ApiTags('QuanLyRap')
  @ApiResponse({ status: 200, description: 'thành công!' })
  @ApiResponse({ status: 400, description: 'lỗi...' })
  @Get('LayThongTinCumRapTheoHeThong')
  cumRapInfo(@Query('maHeThongRap') maHeThongRap: string) {
    return this.quanLyRapService.cumRapInfo(+maHeThongRap);
  }

  // API LayThongTinLichChieuHeThongRap
  @ApiTags('QuanLyRap')
  @ApiResponse({ status: 200, description: 'thành công!' })
  @ApiResponse({ status: 400, description: 'lỗi...' })
  @Get('LayThongTinLichChieuHeThongRap')
  lichChieuInfo(@Query('maRap') maRap: string) {
    return this.quanLyRapService.lichChieuInfo(+maRap);
  }

  // API LayThongTinLichChieuPhim
  @ApiTags('QuanLyRap')
  @ApiResponse({ status: 200, description: 'thành công!' })
  @ApiResponse({ status: 400, description: 'lỗi...' })
  @Get('LayThongTinLichChieuPhim')
  lichChieuPhimInfo(@Query('maPhim') maPhim: number) {
    return this.quanLyRapService.lichChieuPhimInfo(+maPhim);
  }
}
