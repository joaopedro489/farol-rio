import { Transform, Type } from 'class-transformer'
import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator'

import { AlertTypeEnum } from '../../../domain/types/enum/alert-type.enum'
import { ReviewStatusEnum } from '../../../domain/types/enum/review-status.enum'
import { stringToArrayTransformer } from '@/modules/children/utils/string-to-array'

export class BrowseChildrenQuery {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  offset?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @Transform(stringToArrayTransformer)
  @IsArray()
  @IsString({ each: true })
  neighborhood?: string[]

  @IsOptional()
  @Transform(stringToArrayTransformer)
  @IsArray()
  @IsEnum(AlertTypeEnum, { each: true })
  type?: AlertTypeEnum[]

  @IsOptional()
  @IsEnum(ReviewStatusEnum)
  statusReview?: ReviewStatusEnum
}
