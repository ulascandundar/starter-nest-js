import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderItem, OrderItemSchema } from './order-item.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: OrderItem.name, schema: OrderItemSchema }])],
  exports: [MongooseModule],
})
export class OrderItemsModule {} 