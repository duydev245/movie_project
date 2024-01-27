import { Injectable } from '@nestjs/common';
import { CreateQuanLyRapDto } from './dto/create-quan-ly-rap.dto';
import { UpdateQuanLyRapDto } from './dto/update-quan-ly-rap.dto';

@Injectable()
export class QuanLyRapService {
  create(createQuanLyRapDto: CreateQuanLyRapDto) {
    return 'This action adds a new quanLyRap';
  }

  findAll() {
    return `This action returns all quanLyRap`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quanLyRap`;
  }

  update(id: number, updateQuanLyRapDto: UpdateQuanLyRapDto) {
    return `This action updates a #${id} quanLyRap`;
  }

  remove(id: number) {
    return `This action removes a #${id} quanLyRap`;
  }
}
