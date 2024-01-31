import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFiles } from '@nestjs/common';
import { QuanLyPhimService } from './quan-ly-phim.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('QuanLyPhim')
export class QuanLyPhimController {
  constructor(private readonly quanLyPhimService: QuanLyPhimService) { }

  // API LayDanhSachBanner
  @ApiTags('QuanLyPhim')
  @ApiResponse({ status: 200, description: 'thành công!' })
  @ApiResponse({ status: 400, description: 'lỗi...' })
  @Get('LayDanhSachBanner')
  BannerList() {
    return this.quanLyPhimService.BannerList();
  }

  // API LayDanhSachPhim
  @ApiTags('QuanLyPhim')
  @ApiResponse({ status: 200, description: 'thành công!' })
  @ApiResponse({ status: 400, description: 'lỗi...' })
  @Get('LayDanhSachPhim')
  phimList(@Query('tenPhim') tenPhim: string) {
    return this.quanLyPhimService.phimList(tenPhim);
  }

  // API LayDanhSachPhimPhanTrang
  @ApiTags('QuanLyPhim')
  @ApiResponse({ status: 200, description: 'thành công!' })
  @ApiResponse({ status: 400, description: 'lỗi...' })
  @Get('LayDanhSachPhimPhanTrang')
  phimListPage(@Query('tenPhim') tenPhim: string, @Query('soTrang') soTrang: number, @Query('soPhanTuTrenTrang') soPhanTuTrenTrang: number) {
    return this.quanLyPhimService.phimListPage(tenPhim, +soTrang, +soPhanTuTrenTrang);
  }

  // API LayDanhSachPhimTheoNgay
  @ApiTags('QuanLyPhim')
  @ApiResponse({ status: 200, description: 'thành công!' })
  @ApiResponse({ status: 400, description: 'lỗi...' })
  @Get('LayDanhSachPhimTheoNgay')
  phimListDate(@Query('tenPhim') tenPhim: string, @Query('soTrang') soTrang: number, @Query('soPhanTuTrenTrang') soPhanTuTrenTrang: number, @Query('tuNgay') tuNgay: string, @Query('denNgay') denNgay: string){
    return this.quanLyPhimService.phimListDate(tenPhim, +soTrang, +soPhanTuTrenTrang, tuNgay, denNgay);
  }

  // API ThemPhimUploadHinh
  @ApiTags('QuanLyPhim')
  @ApiResponse({ status: 200, description: 'thành công!' })
  @ApiResponse({ status: 400, description: 'lỗi...' })
  @Post('ThemPhimUploadHinh')
  ThemPhimUploadHinh(){
    return this.quanLyPhimService.ThemPhimUploadHinh();
  }

  // API CapNhatPhimUpload

  // API ThemPhim (QuanLyPhim) 

  // API XP
  @ApiTags('QuanLyPhim')
  @ApiResponse({ status: 200, description: 'thành công!' })
  @ApiResponse({ status: 400, description: 'lỗi...' })
  @Delete('XP')
  XP(@Query('MaPhim') MaPhim: number){
    return this.quanLyPhimService.XoaPhim(+MaPhim);
  }

  // API XoaPhim
  @ApiTags('QuanLyPhim')
  @ApiResponse({ status: 200, description: 'thành công!' })
  @ApiResponse({ status: 400, description: 'lỗi...' })
  @Delete('XoaPhim')
  XoaPhim(@Query('MaPhim') MaPhim: number){
    return this.quanLyPhimService.XoaPhim(+MaPhim);
  }

  // API LayThongTinPhim
  @ApiTags('QuanLyPhim')
  @ApiResponse({ status: 200, description: 'thành công!' })
  @ApiResponse({ status: 400, description: 'lỗi...' })
  @Get('LayThongTinPhim')
  LayThongTinPhim(@Query('MaPhim') MaPhim: number) {
    return this.quanLyPhimService.LayThongTinPhim(+MaPhim);
  }
}
