import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

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
            throw new HttpException({message:'Lay danh sach nguoi dung that bai'},HttpStatus.BAD_REQUEST)
        }
    }

}
