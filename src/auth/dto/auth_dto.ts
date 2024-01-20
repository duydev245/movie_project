import {  IsEmail,IsNotEmpty,Matches,MinLength } from "class-validator"
export class registerDto{

    @IsNotEmpty()
    ho_ten :string
    @IsEmail()
    email:string
    @IsNotEmpty()
    so_dt :string
    @MinLength(6)
    mat_khau:string

    loai_nguoi_dung :string
}

export class loginDto{
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsNotEmpty()
    @MinLength(6)
    mat_khau:string
}