import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { DatVeDto } from './dto/QuanLyDatVeDto';
import { QuanLyDatVehService } from './quan-ly-dat-ve.service';
import * as jwt from 'jsonwebtoken'
import { DecodedToken } from './types/DecodedTokenInterface';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('QuanLyDatVe')
export class QuanLyDatVehController {
  constructor(private readonly quanLyDatVehService: QuanLyDatVehService) {}
  @ApiTags('QuanLyNguoiDung')
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiResponse({status:200,description:'Đặt vé thành công'})
  @ApiResponse({status:400,description:'Đặt vé thất bại !!'})
  @Post('DatVe')
  async datVe(@Body() dto: DatVeDto, @Req() req: any) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_KEY) as DecodedToken;
    const taiKhoanNguoiDung = decodedToken.id;
    return this.quanLyDatVehService.datVe(dto, taiKhoanNguoiDung);
  }
}
