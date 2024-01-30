import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
      throw new HttpException({ message: 'Lỗi...' }, HttpStatus.INTERNAL_SERVER_ERROR);
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
      throw new HttpException({ message: 'Lỗi...' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // LayDanhSachPhimPhanTrang
  async phimListPage(tenPhim: string, soTrang: number, soPhanTuTrenTrang: number) {
    try {
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
        throw new Error("Số Trang Không Khả Dụng!");
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
    } catch (error) {
      console.log(error);
      throw new HttpException({ message: 'Lỗi...' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // LayDanhSachPhimTheoNgay
  async phimListDate(tenPhim: string, soTrang: number, soPhanTuTrenTrang: number, tuNgay: string, denNgay: string) {
    try {
      const vitribatdau = (soTrang - 1) * soPhanTuTrenTrang;

      const tongPhanTu = await this.prisma.phim.count({
        where: {
          ten_phim: {
            contains: tenPhim,
          },
          ngay_khoi_chieu: {
            gte: new Date(tuNgay),
            lte: new Date(denNgay)
          }
        }
      })

      const tongTrang = Math.ceil(tongPhanTu / soPhanTuTrenTrang);
      
      if(soTrang < 1 || soTrang > tongTrang) {
        throw new Error("Số Trang Không Khả Dụng!");
      }

      const data = await this.prisma.phim.findMany({
        where: {
          ten_phim: {
            contains: tenPhim,
          },
          ngay_khoi_chieu: {
            gte: new Date(tuNgay),
            lte: new Date(denNgay)
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
    } catch (error) {
      console.log(error);
      throw new HttpException({ message: 'Lỗi...' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ThemPhimUploadHinh
  async ThemPhimUploadHinh(){ }
}
