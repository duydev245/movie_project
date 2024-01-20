import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { loginDto, registerDto } from './dto/auth_dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

    constructor(private jwtService:JwtService){}
    prisma = new PrismaClient();


    async register(userData: registerDto) {
        try {
            // Check if email already exists
            const existingUser = await this.prisma.nguoiDung.findFirst({
                where: {
                    email: userData.email,
                },
            });

            if (existingUser) {
                throw new HttpException({ message: 'Email already exists!' }, HttpStatus.BAD_REQUEST);
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(userData.mat_khau, 10);

            // Create a new user
            const createdUser = await this.prisma.nguoiDung.create({
                data: {
                    ...userData,
                    mat_khau: hashedPassword,
                },
            });

            return createdUser;
        } catch (error) {
            // Handle other potential errors (e.g., Prisma create operation failure)
            throw new HttpException({ message: 'Registration failed.' }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async login(userData : loginDto){
        // step 1 : check user is existed by email
        const user = await this.prisma.nguoiDung.findFirst({
            where:{
                email:userData.email
            }
        })
        if(!user){
            throw new HttpException({message:"Acount is not existed!"}, HttpStatus.UNAUTHORIZED)
        }
        //step 2: check pass
        const verifyPass = await bcrypt.compare(userData.mat_khau,user.mat_khau)

        if(!verifyPass){
            throw new HttpException({message:"Password is not correct!"}, HttpStatus.UNAUTHORIZED)
        }
        //step 3 generate access token and ref token

        const payload = {id:user.tai_khoan,name:user.ho_ten,email:user.email}
        const accessToken = await this.jwtService.signAsync(payload,{
            secret:process.env.ACCESS_TOKEN_KEY,
            expiresIn:'1h'
        })
        const refreshToken = await this.jwtService.signAsync(payload,{
            secret: process.env.REFRESH_TOKEN_KEY,
            expiresIn:'7d'
        })
        return {
            accessToken,
            refreshToken
        }

    }
}
