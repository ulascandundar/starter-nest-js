import { IsString, IsNotEmpty, IsNumber, IsOptional, IsUrl, Min, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ 
    example: 'iPhone 14', 
    description: 'Product name' 
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ 
    example: 'Latest iPhone with advanced features', 
    description: 'Product description' 
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ 
    example: 999.99, 
    description: 'Product price' 
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ 
    example: '507f1f77bcf86cd799439011', 
    description: 'Category ID (MongoDB ObjectId)' 
  })
  @IsMongoId()
  @IsNotEmpty()
  categoryId: string;

  @ApiPropertyOptional({ 
    example: 50, 
    description: 'Stock quantity',
    default: 0 
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @ApiPropertyOptional({ 
    example: 'https://example.com/image.jpg', 
    description: 'Product image URL' 
  })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;
} 