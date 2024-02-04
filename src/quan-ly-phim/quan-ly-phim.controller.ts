import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFiles, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { QuanLyPhimService } from './quan-ly-phim.service';
import { ApiTags, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MovieDto } from './dto/movie.dto';
import * as fs from 'fs';
import * as path from 'path';

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
  phimListDate(@Query('tenPhim') tenPhim: string, @Query('soTrang') soTrang: number, @Query('soPhanTuTrenTrang') soPhanTuTrenTrang: number, @Query('tuNgay') tuNgay: string, @Query('denNgay') denNgay: string) {
    return this.quanLyPhimService.phimListDate(tenPhim, +soTrang, +soPhanTuTrenTrang, tuNgay, denNgay);
  }

  // API ThemPhimUploadHinh
  @ApiTags('QuanLyPhim')
  @ApiResponse({ status: 200, description: 'thành công!' })
  @ApiResponse({ status: 400, description: 'lỗi...' })

  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       ten_phim: { type: 'string' },
  //       trailer: { type: 'string' },
  //       hinh_anh: {
  //         type: 'string',
  //         format: 'binary',
  //       },
  //       mo_ta: { type: 'string' },
  //       ngay_khoi_chieu: { type: 'DateTime' },
  //       danh_gia: { type: 'int' },
  //       hot: { type: 'Boolean' },
  //       dang_chieu: { type: 'Boolean' },
  //       SAP_CHIEU: { type: 'Boolean' }
  //     },
  //   },
  // })

  @Post('ThemPhimUploadHinh')
  @ApiConsumes('multipart/form-data')

  @UseInterceptors(FileInterceptor('hinh_anh', {
    storage: diskStorage({
      destination: process.cwd() + "/src/img",
      filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname)
    })
  }))

  async ThemPhimUploadHinh(@UploadedFile() file, @Body() movieDto: MovieDto) {
    try {
      // Ensure the 'file' and 'movieDto' are properly populated
      if (!file || !movieDto) {
        throw new Error('File or movie data is missing');
      }

      // Process the file and get the file path
      const filePath = await this.processFile(file);

      // Call the service to create a new movie
      const result = await this.quanLyPhimService.ThemPhimUploadHinh(movieDto, filePath);

      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  private async processFile(file: Express.Multer.File): Promise<string> {
    // Define the directory where you want to save the processed files
    const uploadDirectory = process.cwd() + "/src/img"; // Adjust the path based on your project structure

    // Create the directory if it doesn't exist
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, { recursive: true });
    }

    // Generate a unique filename
    const uniqueFilename = new Date().getTime() + "_" + file.originalname;

    // Move the uploaded file to the designated directory
    const filePath = path.join(uploadDirectory, uniqueFilename);
    await fs.promises.rename(file.path, filePath);

    // Return the file path to be saved in the database
    return filePath;
  }

  // API CapNhatPhimUpload 
  @ApiTags('QuanLyPhim')
  @ApiResponse({ status: 200, description: 'thành công!' })
  @ApiResponse({ status: 400, description: 'lỗi...' })
  @Post('CapNhatPhimUpload')
  CapNhatPhimUpload() {
    return this.quanLyPhimService.CapNhatPhimUpload();
  }

  // API XP
  @ApiTags('QuanLyPhim')
  @ApiResponse({ status: 200, description: 'thành công!' })
  @ApiResponse({ status: 400, description: 'lỗi...' })
  @Delete('XP')
  XP(@Query('MaPhim') MaPhim: number) {
    return this.quanLyPhimService.XoaPhim(+MaPhim);
  }

  // API XoaPhim
  @ApiTags('QuanLyPhim')
  @ApiResponse({ status: 200, description: 'thành công!' })
  @ApiResponse({ status: 400, description: 'lỗi...' })
  @Delete('XoaPhim')
  XoaPhim(@Query('MaPhim') MaPhim: number) {
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
