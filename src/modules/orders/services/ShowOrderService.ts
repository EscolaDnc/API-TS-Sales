import AppError from '@shared/errors/AppError';
import { ordersRepository } from '../database/repositories/OrdersRepository';
import Order from '../database/entities/Order';

interface IRequest {
  id: string;
}

class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const order = await ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.');
    }

    return order;
  }
}

export default ShowOrderService;
