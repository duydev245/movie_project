import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuanLyRapService } from './quan-ly-rap.service';
import { CreateQuanLyRapDto } from './dto/create-quan-ly-rap.dto';
import { UpdateQuanLyRapDto } from './dto/update-quan-ly-rap.dto';

@Controller('quan-ly-rap')
export class QuanLyRapController {
  constructor(private readonly quanLyRapService: QuanLyRapService) {}

  @Post()
  create(@Body() createQuanLyRapDto: CreateQuanLyRapDto) {
    return this.quanLyRapService.create(createQuanLyRapDto);
  }

  @Get()
  findAll() {
    return this.quanLyRapService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quanLyRapService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuanLyRapDto: UpdateQuanLyRapDto) {
    return this.quanLyRapService.update(+id, updateQuanLyRapDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quanLyRapService.remove(+id);
  }
}
