import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CapNhatThongTinNguoiDungDto, ThemNguoiDung } from './dto/user_dto';

@Controller('QuanLyNguoiDung')
export class UserController {
  constructor(private readonly userService: UserService) { }


  // API lấy danh sách loại người dung bao gồm (ho_ten, email,loai_nguoi_dung)
  // vì đề không rõ :)) nên dùng findMany 
  @ApiTags('QuanLyNguoiDung')
  @Get('LayDanhSachLoaiNguoiDung')
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Lấy danh sách loại người dùng thành công!!' })
  @ApiResponse({ status: 500, description: 'Lấy danh sách loại người dùng thất bại !!' })
  LayDanhSachLoaiNguoiDung() {
    return this.userService.LayDanhSachLoaiNguoiDung();
  }

  // API Lấy danh sách người dùng
  @ApiTags('QuanLyNguoiDung')
  @Get('LayDanhSachNguoiDung')
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Lấy danh sách người dùng thành công!!' })
  @ApiResponse({ status: 500, description: 'Lấy danh sách người dùng thất bại !!' })
  LayDanhSachNguoiDung() {
    return this.userService.LayDanhSachNguoiDung()
  }

  @ApiTags('QuanLyNguoiDung')
  @Get('LayDanhSachNguoiDungPhanTrang')
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Lấy danh sách người dùng phân trang thành công!!' })
  @ApiResponse({ status: 500, description: 'Lấy danh sách người dùng phân trang thất bại !!' })
  LayDanhSachNguoiDungPhanTrang(
    @Query('currentPage') currentPage: string,
    @Query('limit') limit: string) {
    return this.userService.LayDanhSachNguoiDungPhanTrang(+currentPage, +limit);
  }

  @ApiTags('QuanLyNguoiDung')
  @Get('timKiemNguoiDung/:id')
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Tìm kiếm người dùng thành công!!' })
  @ApiResponse({ status: 500, description: 'Tìm kiếm người dùng thất bại !!' })
  timKiemNguoiDung(@Param('id') id: string) {
    return this.userService.timKiemNguoiDung(+id);
  }

  @ApiTags('QuanLyNguoiDung')
  @Get('timKiemNguoiDungTheoTenPhanTrang')
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Tìm kiếm người dùng theo tên phân trang thành công!!' })
  @ApiResponse({ status: 500, description: 'Tìm kiếm người dùng theo tên phân trang thất bại !!' })
  timKiemNguoiDungTheoTen(@Query('tenNguoiDung') tenNguoiDung: string,
    @Query('currentPage') currentPage: string,
    @Query('limit') limit: string) {
    return this.userService.timKiemNguoiDungTheoTenPhanTrang(tenNguoiDung, +currentPage, +limit)
  }

  @ApiTags('QuanLyNguoiDung')
  @Post('ThongTinTaiKhoan')
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Lấy thông tin người tài khoản theo Id thành công!!' })
  @ApiResponse({ status: 500, description: 'TLấy thông tin tài khoản dùng theo Id thất bại !!' })
  getThongTinTaiKhoan(@Body('Userid') userId: number) {
    return this.userService.getThongTinTaiKhoan(userId);
  }

  @ApiTags('QuanLyNguoiDung')
  @Post('LayThongTinNguoiDung')
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Lấy thông tin người dùng theo tài khoản thành công!!' })
  @ApiResponse({ status: 500, description: 'TLấy thông tin người dùng theo tài khoản thất bại !!' })
  getUserInfo(@Body('Tai_Khoan') tai_khoan: string) {
    return this.userService.LayThongTinNguoiDung(tai_khoan)
  }
  @ApiTags('QuanLyNguoiDung')
  @Post('ThemNguoiDung')
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Thêm người dùng thành công!!' })
  @ApiResponse({ status: 500, description: 'Thêm người dùng thất bại !!' })
  async themNguoiDung(@Body() dto: ThemNguoiDung) {

    return this.userService.themNguoiDung(dto);
  }
  @ApiTags('QuanLyNguoiDung')
  @Put('CapNhatThongTinNguoiDung/:id')
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Cập nhật người dùng thành công!!' })
  @ApiResponse({ status: 500, description: 'Cập nhật người dùng thất bại !!' })
  CapNhatThongTinNguoiDung(@Param('id') id: string, @Body() dto: CapNhatThongTinNguoiDungDto) {
    return this.userService.CapNhatThongTinNguoiDung(+id, dto)
  }
  @ApiTags('QuanLyNguoiDung')
  @Post('CapNhatThongTinNguoiDung/:id')
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Cập nhật người dùng thành công!!' })
  @ApiResponse({ status: 500, description: 'Cập nhật người dùng thất bại !!' })
  CapNhatThongTinNguoiDungPost(@Param('id') id: string, @Body() dto: CapNhatThongTinNguoiDungDto) {
    return this.userService.CapNhatThongTinNguoiDungPost(+id, dto)
  }
  @ApiTags('QuanLyNguoiDung')
  @Delete('XoaNguoiDung')
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Xóa người dùng thành công!!' })
  @ApiResponse({ status: 500, description: 'Xóa người dùng thất bại !!' })
  xoaNguoiDung(@Query('TaiKhoan') taiKhoan: string) {
    try {
      return this.userService.xoaNguoiDung(+taiKhoan);
    } catch (error) {
      throw new HttpException({ message: 'Xóa người dùng thất bại' },HttpStatus.INTERNAL_SERVER_ERROR)}

  }

}
