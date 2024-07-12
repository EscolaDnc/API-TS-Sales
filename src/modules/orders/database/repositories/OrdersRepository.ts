import { AppDataSource } from '@shared/typeorm/data-source';
import Customer from '@modules/customers/database/entities/Customer';
import Order from '../entities/Order';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Customer;
  products: IProduct[];
}

export const ordersRepository = AppDataSource.getRepository(Order).extend({
  async findById(id: string): Promise<Order | null> {
    const order = await this.findOne({
      where: { id },
      relations: ['order_products', 'customer'],
    });

    return order;
  },

  async createOrder({ customer, products }: IRequest): Promise<Order> {
    const order = this.create({
      customer,
      order_products: products,
    });

    await this.save(order);

    return order;
  },
});
