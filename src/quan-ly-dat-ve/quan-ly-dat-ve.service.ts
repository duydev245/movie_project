import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { DatVeDto, LichChieuDto } from './dto/QuanLyDatVeDto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class QuanLyDatVehService {
  constructor() { }

  prisma = new PrismaClient();

  // dat ve
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

  // lay danh sach phong ve
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

  //khoi tao lich chieu
  async TaoLichChieu(dto : LichChieuDto){

    try {
      const checkMaPhim = await this.prisma.phim.findFirst({
        where:{
          ma_phim:dto.maPhim,

        }
      })
      if(!checkMaPhim){
        throw new HttpException({message:"Khong co ma phim thich hop!!!"}, HttpStatus.BAD_REQUEST)
      }
      const checkMaRap = await this.prisma.rapPhim.findFirst({
        where:{
          ma_rap:dto.maRap
        }
      })
      if(!checkMaPhim){
        throw new HttpException({message:'Ma rap khong thich hop '}, HttpStatus.BAD_REQUEST)
      }
      const ngayGioChieu = new Date(dto.ngayChieuGioChieu);
      const lichChieu = await this.prisma.lichChieu.create({
        data:{
          ma_rap:dto.maRap,
          ma_phim:dto.maPhim,
          ngay_gio_chieu:ngayGioChieu.toISOString(),
          gia_ve:dto.giaVe
          
        }
      })
      return lichChieu
    } catch (error) {
      throw new HttpException({message:"Tao lich chieu that bai"}, HttpStatus.BAD_REQUEST);

    }

  }
}
