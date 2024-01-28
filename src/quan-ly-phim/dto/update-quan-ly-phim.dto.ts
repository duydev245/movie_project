import { PartialType } from '@nestjs/swagger';
import { CreateQuanLyPhimDto } from './create-quan-ly-phim.dto';

export class UpdateQuanLyPhimDto extends PartialType(CreateQuanLyPhimDto) {}
