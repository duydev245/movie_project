import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator"
export class registerDto {

    @ApiProperty({ example: 'password', description: 'Mật khẩu' })
    matKhau: string;
  
    @ApiProperty({ example: 'Họ và tên', description: 'Họ và tên' })
    @IsNotEmpty()
    @IsNotEmpty()
    ho_ten: string
  
    @ApiProperty({ example: 'example@email.com', description: 'Email' })
    @IsEmail()
    email: string;
  
    @ApiProperty({ example: '123456789', description: 'Số điện thoại' })
    @IsNotEmpty()
    @IsNotEmpty()
    so_dt: string
  
    @ApiProperty({ example: 'password123', description: 'Mật khẩu' })
    @MinLength(6)
      
    @MinLength(6)
    mat_khau: string
  
    @ApiProperty({ example: 'user', description: 'Loại người dùng' })
    loai_nguoi_dung: string;
    
    
   
  

    
}

export class loginDto {
    
    @ApiProperty({ example: 'username', description: 'Tên tài khoản' })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({ example: 'password', description: 'Mật khẩu' })
    @IsNotEmpty()
    @MinLength(6)
    mat_khau: string
   

   
}