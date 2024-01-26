import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CapNhatThongTinNguoiDungDto, ThemNguoiDung } from './dto/user_dto';
import * as bcrypt from 'bcrypt'
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
            throw new HttpException({ message: 'Lay danh sach nguoi dung that bai' }, HttpStatus.INTERNAL_SERVER_ERROR)
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
            throw new HttpException({ message: "Lay danh sach nguoi dung failed!!" }, HttpStatus.INTERNAL_SERVER_ERROR)
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
            throw new HttpException({ message: "tim kiem nguoi dung that bai!!!" }, HttpStatus.INTERNAL_SERVER_ERROR)
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
            throw new HttpException({ message: "tim kiem nguoi dung that bai!!!" }, HttpStatus.INTERNAL_SERVER_ERROR)

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
            throw new HttpException({ message: "Get thong tin thai khoan fail" }, HttpStatus.INTERNAL_SERVER_ERROR);
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
    async themNguoiDung(dto: ThemNguoiDung) {
        try {
            const hashedPassword = await bcrypt.hash(dto.matKhau, 10);
            // Tạo người dùng mới
            return this.prisma.nguoiDung.create({
                data: {
                    mat_khau: hashedPassword,
                    email: dto.email,
                    so_dt: dto.soDt,
                    loai_nguoi_dung: dto.maLoaiNguoiDung,
                    ho_ten: dto.hoTen,
                },
            });
        } catch (error) {
            console.error('Error while creating user:', error);
            throw new HttpException('Thêm người dùng thất bại', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async CapNhatThongTinNguoiDung(id: number, dto: CapNhatThongTinNguoiDungDto) {

        try {
            const newHashPass = await bcrypt.hash(dto.matKhau, 10)
            await this.prisma.nguoiDung.update({
                where: { tai_khoan: id },
                data: {
                    ho_ten: dto.hoTen,
                    email: dto.email,
                    so_dt: dto.soDt,
                    mat_khau: newHashPass,
                },
            });

        } catch (error) {
            throw new HttpException({ message: "Cập nhật thông tin người dùng thất bại" }, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }
    async CapNhatThongTinNguoiDungPost(id: number, dto: CapNhatThongTinNguoiDungDto) {
        try {
            const hashedPassword = await bcrypt.hash(dto.matKhau, 10);
            await this.prisma.nguoiDung.update({
                where: { tai_khoan: id },
                data: {
                    ho_ten: dto.hoTen,
                    email: dto.email,
                    so_dt: dto.soDt,
                    mat_khau: hashedPassword,
                },
            });
        } catch (error) {
            throw new HttpException({ message: 'Cập nhật thông tin người dùng thất bại!!' }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async xoaNguoiDung(taikhoan: number) {
        try {
            const user = await this.prisma.nguoiDung.findFirst({
                where: {
                    tai_khoan: taikhoan
                }
            });
            if (!user) {
                throw new NotFoundException('Người dùng không tồn tại');
            }
            await this.prisma.nguoiDung.delete({
                where: {
                    tai_khoan: user.tai_khoan,
                },
            });
        } catch (error) {
            throw new Error('Đã xảy ra lỗi khi xóa người dùng: ' + error.message);
        }
    }
}