import { Body, Controller, Post, Req } from '@nestjs/common';
import { DatVeDto } from './dto/QuanLyDatVeDto';
import { QuanLyDatVehService } from './quan-ly-dat-ve.service';
import * as jwt from 'jsonwebtoken'
import { DecodedToken } from './types/DecodedTokenInterface';

@Controller('QuanLyDatVe')
export class QuanLyDatVehController {
  constructor(private readonly quanLyDatVehService: QuanLyDatVehService) {}



  @Post('DatVe')
  async datVe(@Body() dto: DatVeDto, @Req() req: any) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_KEY) as DecodedToken;
    const taiKhoanNguoiDung = decodedToken.id;
    return this.quanLyDatVehService.datVe(dto, taiKhoanNguoiDung);
  }
}
