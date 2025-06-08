import { IsOptional, IsNumber, Min, IsString, IsMongoId } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @ApiPropertyOptional({ 
    example: 1, 
    description: 'Page number',
    default: 1 
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ 
    example: 10, 
    description: 'Number of items per page',
    default: 10 
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({ 
    example: 'name', 
    description: 'Search term' 
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ 
    example: '507f1f77bcf86cd799439011', 
    description: 'Filter by category ID' 
  })
  @IsOptional()
  @IsMongoId()
  categoryId?: string;
} 