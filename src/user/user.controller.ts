import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

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
  @ApiResponse({ status: 400, description: 'Lấy danh sách loại người dùng thất bại !!' })
  LayDanhSachLoaiNguoiDung() {
    return this.userService.LayDanhSachLoaiNguoiDung();
  }


  @Get('LayDanhSachNguoiDung')
  LayDanhSachNguoiDung() {
    return this.userService.LayDanhSachNguoiDung()
  }
}
