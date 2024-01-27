import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class QuanLyRapService {

  prisma = new PrismaClient();

  // LayThongTinHeThongRap
  async heThongRapInfo() {
    try {
      let data = this.prisma.heThongRap.findMany();
      return data;
    } catch (error) {
      console.log(error);
      return 'lôi...';
    }
  }

  

  // create(createQuanLyRapDto: CreateQuanLyRapDto) {
  //   return 'This action adds a new quanLyRap';
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} quanLyRap`;
  // }

  // update(id: number, updateQuanLyRapDto: UpdateQuanLyRapDto) {
  //   return `This action updates a #${id} quanLyRap`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} quanLyRap`;
  // }
}
