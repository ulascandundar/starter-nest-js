import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ 
    example: 'Electronics', 
    description: 'Category name' 
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ 
    example: 'Electronic devices and gadgets', 
    description: 'Category description' 
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({ 
    example: 'electronics', 
    description: 'Category slug (URL-friendly name)' 
  })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ 
    example: 'https://example.com/category-image.jpg', 
    description: 'Category image URL' 
  })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;
} 