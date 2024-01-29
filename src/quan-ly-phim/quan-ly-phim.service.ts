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
    const vitribatdau = (soTrang - 1) * soPhanTuTrenTrang;

    const tongPhanTu = await this.prisma.phim.count({
      where: {
        ten_phim: {
          contains: tenPhim,
        }
      }
    })

    const tongTrang = Math.ceil(tongPhanTu / soPhanTuTrenTrang);
    
    if(soTrang < 1 || soTrang > tongTrang) {
      throw new Error("Invalid currentPage value");
    }

    const data = await this.prisma.phim.findMany({
      where: {
        ten_phim: {
          contains: tenPhim,
        }
      },
      take: soPhanTuTrenTrang,
      skip: vitribatdau
    })

    console.log("Số Trang: ",soTrang);
    console.log("Số Phần Tử: ", soPhanTuTrenTrang);
    console.log("Offset: ", vitribatdau);
        
    return {
      data,
      soTrang,
      tongTrang,
      tongPhanTu
    }
  }

}
