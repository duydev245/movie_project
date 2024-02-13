import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
export class UpdateQuanLyPhimDto {
    @ApiProperty()
    ma_phim: number;

    @ApiProperty({ required: false })
    ten_phim: string;
  
    @ApiProperty({ required: false })
    trailer: string;
  
    @ApiProperty({ type: 'string', format: 'binary', required: false })
    hinh_anh: Express.Multer.File;
  
    @ApiProperty({ required: false })
    mo_ta: string;
  
    @ApiProperty({ required: false })
    ngay_khoi_chieu: Date;
  
    @ApiProperty({ required: false })
    danh_gia: number | null;
  
    @ApiProperty({ type: 'boolean', required: false })
    hot: string | null;
  
    @ApiProperty({ type: 'boolean', required: false })
    dang_chieu: string | null;
  
    @ApiProperty({ type: 'boolean', required: false })
    SAP_CHIEU: string | null;
}
