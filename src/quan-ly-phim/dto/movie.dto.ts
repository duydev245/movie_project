// movie.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class MovieDto {
  @ApiProperty()
  ten_phim: string;

  @ApiProperty()
  trailer: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  hinh_anh: Express.Multer.File;

  @ApiProperty()
  mo_ta: string;

  @ApiProperty()
  ngay_khoi_chieu: Date;

  @ApiProperty()
  danh_gia: number | null;

  @ApiProperty()
  hot: number | null;

  @ApiProperty()
  dang_chieu: number | null;

  @ApiProperty()
  SAP_CHIEU: number | null;
}
