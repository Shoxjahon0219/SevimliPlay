import { PartialType } from '@nestjs/mapped-types';
import { CreateContentTagDto } from './create-content_tag.dto';

export class UpdateContentTagDto extends PartialType(CreateContentTagDto) {}
