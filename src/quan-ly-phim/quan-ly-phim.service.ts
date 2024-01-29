import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class QuanLyPhimService {

  prisma = new PrismaClient();

  // LayDanhSachBanner
  async BannerList() {
    try {
      let data = await this.prisma.banner.findMany();
      return data;
    } catch (error) {
      console.log(error);
      return 'thất bại';
    }
  }

  // LayDanhSachPhim
  async phimList(tenPhim: string) {
    try {
      let data = await this.prisma.phim.findMany({
        where: {
          ten_phim: {
            contains: tenPhim
          }
        }
      })
      return data;
    } catch (error) {
      console.log(error);
      return 'thất bại';
    }
  }

  // LayDanhSachPhimPhanTrang
  async phimListPage(tenPhim: string, soTrang: number, soPhanTuTrenTrang: number) {
    



  }

}
