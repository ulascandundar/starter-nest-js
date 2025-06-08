import { IsArray, IsNotEmpty, IsString, IsNumber, IsOptional, ValidateNested, IsMongoId, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ShippingAddressDto {
  @ApiProperty({ example: '123 Main St', description: 'Street address' })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ example: 'New York', description: 'City' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'NY', description: 'State' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ example: '10001', description: 'ZIP code' })
  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @ApiProperty({ example: 'USA', description: 'Country' })
  @IsString()
  @IsNotEmpty()
  country: string;
}

export class OrderItemDto {
  @ApiProperty({ 
    example: '507f1f77bcf86cd799439011', 
    description: 'Product ID' 
  })
  @IsMongoId()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ 
    example: 2, 
    description: 'Quantity of the product' 
  })
  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ 
    type: [OrderItemDto],
    description: 'Array of order items' 
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiProperty({ 
    type: ShippingAddressDto,
    description: 'Shipping address' 
  })
  @ValidateNested()
  @Type(() => ShippingAddressDto)
  shippingAddress: ShippingAddressDto;

  @ApiPropertyOptional({ 
    example: 'Credit Card', 
    description: 'Payment method' 
  })
  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @ApiPropertyOptional({ 
    example: 'Please deliver to the back door', 
    description: 'Special notes for the order' 
  })
  @IsOptional()
  @IsString()
  notes?: string;
} 