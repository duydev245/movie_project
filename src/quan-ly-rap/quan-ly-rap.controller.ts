import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuanLyRapService } from './quan-ly-rap.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('QuanLyRap')
export class QuanLyRapController {
  constructor(private readonly quanLyRapService: QuanLyRapService) { }

  // API LayThongTinHeThongRap
  @ApiTags('QuanLyRap')
  @ApiResponse({ status: 200, description: 'thành công!' })
  @ApiResponse({ status: 400, description: 'lỗi...' })
  @Get('LayThongTinHeThongRap')
  heThongRapInfo() {
    return this.quanLyRapService.heThongRapInfo();
  }

  // @Post()
  // create(@Body() createQuanLyRapDto: CreateQuanLyRapDto) {
  //   return this.quanLyRapService.create(createQuanLyRapDto);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.quanLyRapService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateQuanLyRapDto: UpdateQuanLyRapDto) {
  //   return this.quanLyRapService.update(+id, updateQuanLyRapDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.quanLyRapService.remove(+id);
  // }
}
