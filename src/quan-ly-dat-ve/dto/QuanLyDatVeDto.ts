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


export class 