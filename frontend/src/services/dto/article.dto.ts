import { Expose } from 'class-transformer';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateArticleDto {
  @Expose()
  @IsString()
  @MinLength(4)
  name!: string;

  @Expose()
  @IsString()
  @MinLength(1)
  sectionId!: string;

  @Expose()
  @IsString()
  @MinLength(4)
  content!: string;

  @Expose()
  @IsString()
  @MinLength(1)
  status!: string;

  @Expose()
  @IsOptional()
  @IsString()
  userId?: string;
}
