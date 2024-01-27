import { PartialType } from '@nestjs/swagger';
import { CreateQuanLyRapDto } from './create-quan-ly-rap.dto';

export class UpdateQuanLyRapDto extends PartialType(CreateQuanLyRapDto) {}
