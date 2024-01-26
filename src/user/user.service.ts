import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { STATUS_CODES } from 'http';

@Injectable()
export class UserService {

    prisma = new PrismaClient()
    //API lấy danh sách loại người dùng
    async LayDanhSachLoaiNguoiDung() {
        try {
            const data = await this.prisma.nguoiDung.findMany({
                select: {
                    ho_ten: true,
                    email: true,
                    loai_nguoi_dung: true,
                },
            });
            return data;
        } catch (error) {
            throw new HttpException({ message: 'Lay danh sach nguoi dung that bai' }, HttpStatus.BAD_REQUEST)
        }
    }

    //API lấy danh sách người dùng
    async LayDanhSachNguoiDung() {

        const data = await this.prisma.nguoiDung.findMany()
        return data;
    }

    async LayDanhSachNguoiDungPhanTrang(currentPage: number, limit: number) {
        try {
            const totalItem = (await this.prisma.nguoiDung.findMany()).length;
            const totalPages = Math.ceil(totalItem / limit)
            if (currentPage < 1 || currentPage > totalPages) {
                throw new Error("Invalid currentPage value");

            }
            console.log("Current Page:", currentPage);
            console.log("Limit:", limit);
            const offset = (currentPage - 1) * limit; // vị trí bắt đầu của bản ghi trong kết quả truy vấn
            console.log("Offset:", offset);
            const data = await this.prisma.nguoiDung.findMany({
                take: limit,  // Số lượng bản ghi muốn lấy cho mỗi trang
                skip: offset  // Vị trí bắt đầu của tập hợp con của dữ liệu
            });

            return {
                data,
                currentPage,
                totalPages,
                totalItem: totalItem,
            }
        } catch (error) {
            console.log(error);
            throw new HttpException({ message: "Lay danh sach nguoi dung failed!!" }, HttpStatus.BAD_REQUEST)
        }

    }
    async timKiemNguoiDung(id: number) {
        try {
            const data = await this.prisma.nguoiDung.findFirst({
                where: {
                    tai_khoan: id,
                },
            });
            return data;
        } catch (error) {
            console.log(error);
            throw new HttpException({ message: "tim kiem nguoi dung that bai!!!" }, HttpStatus.BAD_REQUEST)
        }
    }
    async timKiemNguoiDungTheoTenPhanTrang(tenNguoiDung: string, currentPage: number, limit: number) {
        try {
            const offset = (currentPage - 1) * limit;
            const data = await this.prisma.nguoiDung.findFirst({
                where: {
                    ho_ten: {
                        contains: tenNguoiDung
                    }
                },
                take: limit,
                skip: offset
            })
            const totalItems = await this.prisma.nguoiDung.count({
                where: {
                    ho_ten: {
                        contains: tenNguoiDung,
                    },
                },
            });
            return {
                data,
                currentPage,
                totalItems
            }

        } catch (error) {
            throw new HttpException({ message: "tim kiem nguoi dung that bai!!!" }, HttpStatus.BAD_REQUEST)

        }
    }

    async getThongTinTaiKhoan(userId: number) {
        try {
            const data = await this.prisma.nguoiDung.findFirst({
                where: {
                    tai_khoan: userId
                }
            })
            return data;
        } catch (error) {
            throw new HttpException({ message: "Get thong tin thai khoan fail" }, HttpStatus.NOT_FOUND);
        }
    }
    async LayThongTinNguoiDung(tai_khoan: string) {
        try {
            const data = await this.prisma.nguoiDung.findFirst({
                where: {
                    email: tai_khoan
                }
            })
            if (data === null) {
                throw new HttpException({ message: 'Khong tim thay thong tin nguoi dung!!' }, HttpStatus.NOT_FOUND)
            }
            return data
        } catch (error) {
            throw new HttpException({ message: 'Tim kiem nguoi dung failed!!' }, HttpStatus.BAD_REQUEST);
        }
    }
}
