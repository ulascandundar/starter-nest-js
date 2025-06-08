import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument, OrderStatus } from './order.schema';
import { OrderItem, OrderItemDocument } from '../order-items/order-item.schema';
import { Product, ProductDocument } from '../products/product.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(OrderItem.name) private orderItemModel: Model<OrderItemDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  private generateOrderNumber(): string {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ORD-${timestamp}-${random}`;
  }

  async create(createOrderDto: CreateOrderDto, userId: string): Promise<any> {
    // Validate products and calculate total
    let totalAmount = 0;
    const orderItems: any[] = [];

    for (const item of createOrderDto.items) {
      const product = await this.productModel.findById(item.productId);
      if (!product) {
        throw new NotFoundException(`Product with ID ${item.productId} not found`);
      }
      if (!product.isActive) {
        throw new BadRequestException(`Product ${product.name} is not available`);
      }
      if (product.stock < item.quantity) {
        throw new BadRequestException(`Insufficient stock for product ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`);
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        unitPrice: product.price,
        totalPrice: itemTotal,
      });
    }

    // Create order
    const orderNumber = this.generateOrderNumber();
    const order = new this.orderModel({
      orderNumber,
      user: userId,
      totalAmount,
      shippingAddress: createOrderDto.shippingAddress,
      paymentMethod: createOrderDto.paymentMethod,
      notes: createOrderDto.notes,
    });

    const savedOrder = await order.save();

    // Create order items and update product stock
    for (let i = 0; i < orderItems.length; i++) {
      const orderItem = new this.orderItemModel({
        order: savedOrder._id,
        ...orderItems[i],
      });
      await orderItem.save();

      // Update product stock
      await this.productModel.findByIdAndUpdate(
        createOrderDto.items[i].productId,
        { $inc: { stock: -createOrderDto.items[i].quantity } }
      );
    }

    return this.findOne((savedOrder._id as any).toString());
  }

  async findAll(paginationDto: PaginationDto) {
    const page = paginationDto.page || 1;
    const limit = paginationDto.limit || 10;
    const skip = (page - 1) * limit;

    const filter: any = {};
    
    if (paginationDto.search) {
      filter.orderNumber = { $regex: paginationDto.search, $options: 'i' };
    }

    const [orders, total] = await Promise.all([
      this.orderModel
        .find(filter)
        .populate('user', 'firstName lastName email')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.orderModel.countDocuments(filter).exec(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      orders,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  async findUserOrders(userId: string, paginationDto: PaginationDto) {
    const page = paginationDto.page || 1;
    const limit = paginationDto.limit || 10;
    const skip = (page - 1) * limit;

    const filter: any = { user: userId };

    const [orders, total] = await Promise.all([
      this.orderModel
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.orderModel.countDocuments(filter).exec(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      orders,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  async findOne(id: string): Promise<any> {
    const order = await this.orderModel
      .findById(id)
      .populate('user', 'firstName lastName email')
      .exec();

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Get order items
    const orderItems = await this.orderItemModel
      .find({ order: id })
      .populate('product')
      .exec();

    const orderObj = order.toObject();
    return { ...orderObj, items: orderItems };
  }

  async updateStatus(id: string, updateOrderStatusDto: UpdateOrderStatusDto): Promise<Order> {
    const updateData: any = { status: updateOrderStatusDto.status };

    if (updateOrderStatusDto.status === OrderStatus.SHIPPED) {
      updateData.shippedAt = new Date();
    } else if (updateOrderStatusDto.status === OrderStatus.DELIVERED) {
      updateData.deliveredAt = new Date();
    }

    if (updateOrderStatusDto.notes) {
      updateData.notes = updateOrderStatusDto.notes;
    }

    const order = await this.orderModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('user', 'firstName lastName email')
      .exec();

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async cancelOrder(id: string, userId: string): Promise<Order> {
    const order = await this.orderModel.findById(id);
    
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.user.toString() !== userId) {
      throw new BadRequestException('You can only cancel your own orders');
    }

    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException('Order cannot be cancelled at this stage');
    }

    // Restore product stock
    const orderItems = await this.orderItemModel.find({ order: id }).populate('product');
    for (const item of orderItems) {
      await this.productModel.findByIdAndUpdate(
        (item.product as any)._id,
        { $inc: { stock: item.quantity } }
      );
    }

    order.status = OrderStatus.CANCELLED;
    return order.save();
  }
} 