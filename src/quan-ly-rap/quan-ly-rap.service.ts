import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class QuanLyRapService {

  prisma = new PrismaClient();

  // LayThongTinHeThongRap
  async heThongRapInfo(maHeThongRap: number) {
    try {
      let data = await this.prisma.heThongRap.findFirst({
        where: {
          ma_he_thong_rap: maHeThongRap
        }
      });
      return data;
    } catch (error) {
      console.log(error);
      return 'thất bại';
    }
  }

  // LayThongTinCumRapTheoHeThong
  async cumRapInfo(maHeThongRap: number) {
    try {
      let data = await this.prisma.cumRap.findMany({
        where: {
          ma_he_thong_rap: maHeThongRap
        },
      });
      return data;
    } catch (error) {
      console.log(error);
      return 'thất bại';
    }
  }

  // LayThongTinLichChieuHeThongRap
  async lichChieuInfo(maRap: number) {
    try {
      let data = await this.prisma.lichChieu.findMany({
        where: {
          ma_rap: maRap
        },
      });
      return data;
    } catch (error) {
      console.log(error);
      return 'thất bại';
    }
  }

  // LayThongTinLichChieuPhim
  async lichChieuPhimInfo(maPhim: number) {
    try {
      let data = await this.prisma.lichChieu.findMany({
        where: {
          ma_phim: maPhim
        }
      });
      return data;
    } catch (error) {
      console.log(error);
      return 'thất bại';
    }
  }
}
