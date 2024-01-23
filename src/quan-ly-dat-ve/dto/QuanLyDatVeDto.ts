import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty} from "class-validator"

export class DatVeDto {

  taiKhoan: number;

  @ApiProperty({ example: 'maLichChieu', description: 'Mã lịch chiếu ' })
  @IsNotEmpty()
  maLichChieu: number;

  @ApiProperty({ example: 'maGhe', description: 'Mã ghế ' })
  @IsNotEmpty()
  maGhe: number;
}


export class LichChieuDto{

  @ApiProperty({example:'maPhim',description:'Mã phim'})
  @IsNotEmpty()
  maPhim : number
  @ApiProperty({example:'ngayChieuGioiChieu',description:'Ngày giờ chiếu'})
  @IsNotEmpty()
  ngayChieuGioChieu :string
  @ApiProperty({example:'maRap',description:'Mã rạp'})
  @IsNotEmpty()
  maRap : number
  @ApiProperty({example:'giaVe',description:'Giá vé'})
  @IsNotEmpty()
  giaVe : number
}