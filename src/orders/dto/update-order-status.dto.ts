import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatus } from '../order.schema';

export class UpdateOrderStatusDto {
  @ApiProperty({ 
    example: 'confirmed', 
    description: 'Order status',
    enum: OrderStatus
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiPropertyOptional({ 
    example: 'Order confirmed and ready for processing', 
    description: 'Notes about status change' 
  })
  @IsOptional()
  @IsString()
  notes?: string;
} 