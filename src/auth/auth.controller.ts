import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto, registerDto } from './dto/auth_dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

 // api register
  @ApiTags('QuanLyNguoiDung') 
  @HttpCode(200)
  @Post('register')
  register(@Body() body: registerDto){
    try {
      return this.authService.register(body)
    } catch (error) {
      throw new HttpException({message:"Error register !!!!"}, HttpStatus.BAD_REQUEST)
    }
  }

  //api login
  @ApiTags('QuanLyNguoiDung')
  @HttpCode(200)
  @ApiBody({
    type:registerDto
  })
  @Post('login')
  login(@Body() body:loginDto){
    try {
      return this.authService.login(body)
    } catch (error) {
      throw new HttpException({message:"Error login !!!!"}, HttpStatus.BAD_REQUEST)
    }
  }
}
