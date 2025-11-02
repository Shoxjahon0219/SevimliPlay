import { PartialType } from '@nestjs/mapped-types';
import { CreateContentCategoryDto } from './create-content_category.dto';

export class UpdateContentCategoryDto extends PartialType(CreateContentCategoryDto) {}
