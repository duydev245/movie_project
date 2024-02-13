// movie.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

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

  @ApiProperty({ type: 'boolean' })
  hot: string | null;

  @ApiProperty({ type: 'boolean' })
  dang_chieu: string | null;

  @ApiProperty({ type: 'boolean' })
  SAP_CHIEU: string | null;
}
