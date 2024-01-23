import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { DatVeDto } from './dto/QuanLyDatVeDto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class QuanLyDatVehService {
  constructor() { }

  prisma = new PrismaClient();

  async datVe(dto: DatVeDto, taiKhoanNguoiDung: number) {
    try {
      // Kiểm tra tài khoản tồn tại
      const check = await this.prisma.nguoiDung.findFirst({
        where: {
          tai_khoan: taiKhoanNguoiDung
        }
      })
      if (!check) {
        throw new NotFoundException('Tài khoản không tồn tại');
      }

      // Tạo đối tượng DatVe trong CSDL
      const datVe = await this.prisma.datVe.create({
        data: {
          tai_khoan: taiKhoanNguoiDung,
          ma_lich_chieu: dto.maLichChieu,
          ma_ghe: dto.maGhe,
        },
      });
      console.log('Booking success!!!');
      return datVe
    } catch (error) {
      throw new HttpException({ message: 'Error booking ticket' }, HttpStatus.BAD_REQUEST);
    }
  }


  async getDanhSachPhongVe(maLichChieu: number){
    try {
      const danhsach = await this.prisma.lichChieu.findFirst({
        where:{
          ma_lich_chieu:maLichChieu
        }
      })
      return danhsach
    } catch (error) {
      throw new HttpException({message:"Lay danh sach phong ve that bai"}, HttpStatus.BAD_REQUEST);
    }
  }
}
