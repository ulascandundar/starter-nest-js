import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Product } from '../products/product.schema';
import { Order } from '../orders/order.schema';

export type OrderItemDocument = OrderItem & Document;

@Schema({ timestamps: true })
export class OrderItem {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Order', required: true })
  order: Order;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true })
  product: Product;

  @Prop({ required: true, min: 1 })
  quantity: number;

  @Prop({ required: true, min: 0 })
  unitPrice: number; // Price at the time of order (for historical accuracy)

  @Prop({ required: true, min: 0 })
  totalPrice: number; // quantity * unitPrice
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem); 