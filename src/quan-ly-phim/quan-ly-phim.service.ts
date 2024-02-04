import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { MovieDto } from './dto/movie.dto';
import { log } from 'console';


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

      if (soTrang < 1 || soTrang > tongTrang) {
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

      console.log("Số Trang: ", soTrang);
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

      if (soTrang < 1 || soTrang > tongTrang) {
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

      console.log("Số Trang: ", soTrang);
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
  async ThemPhimUploadHinh(movieDto: MovieDto, filePath: string) {
    console.log(movieDto);
    try {
      const createdMovie = await this.prisma.phim.create({
        data: {
          ten_phim: movieDto.ten_phim,
          trailer: movieDto.trailer,
          hinh_anh: filePath,
          mo_ta: movieDto.mo_ta,
          ngay_khoi_chieu: movieDto.ngay_khoi_chieu,
          danh_gia: +movieDto.danh_gia,
          hot: +movieDto.hot,
          dang_chieu: +movieDto.dang_chieu,
          SAP_CHIEU: +movieDto.SAP_CHIEU,
        },
      });
      return { success: true, movie: createdMovie };
    } catch (error) {

      console.log(error);
      return { success: false, error: error.message };
    }
  }

  // CapNhatPhimUpload
  async CapNhatPhimUpload() {

  }

  // XoaPhim - XP
  async XoaPhim(MaPhim: number) {
    try {
      let phim = await this.prisma.phim.findFirst({
        where: {
          ma_phim: MaPhim
        }
      });

      if (!phim) {
        throw new NotFoundException('Phim không tồn tại');
      }

      await this.prisma.phim.delete({
        where: {
          ma_phim: phim.ma_phim
        }
      })

      return { message: 'Xóa Thành Công', status: 200, phim };
    } catch (error) {
      console.log(error);
      throw new HttpException({ message: 'Lỗi...' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // LayThongTinPhim
  async LayThongTinPhim(MaPhim: number) {
    try {
      let data = await this.prisma.phim.findFirst({
        where: {
          ma_phim: MaPhim
        }
      })

      return data;
    } catch (error) {
      console.log(error);
      throw new HttpException({ message: 'Lỗi...' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
