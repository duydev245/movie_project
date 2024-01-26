import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class ThemNguoiDung {

    @ApiProperty({ example: 'taiKhoan', description: 'Tài khoản(ID)' })
    taiKhoan: number;
    @ApiProperty({ example: 'matKhau', description: 'Mật khẩu' })
    matKhau: string;
    @ApiProperty({ example: 'email', description: 'Email' })
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @ApiProperty({ example: 'soDt', description: 'Số điện thoại' })
    @IsNotEmpty()
    soDt: string;
    @ApiProperty({ example: 'maLoaiNguoiDung', description: 'Mã loại người dùng' })
    @IsNotEmpty()
    maLoaiNguoiDung: string;
    @ApiProperty({ example: 'hoTen', description: 'Họ tên' })
    @IsNotEmpty()
    hoTen: string;

}