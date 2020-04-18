import { Order } from '../models/order';

export const MOCK_ORDERS: Order[] = [
    { id: 1,
      customer:
        {id: 1, name: 'Samanta', state: 'CO-1', email: 'email-1@gmail.com' },
      total: 2,
      placed: new Date(2020, 4, 17),
      fulfilled: new Date(2020, 4, 18),
      status: 'Complited'
    },
    { id: 2,
      customer:
        {id: 1, name: 'Ben', state: 'CO-2', email: 'email-2@gmail.com' },
      total: 5,
      placed: new Date(2020, 5, 27),
      fulfilled: new Date(2020, 5, 28),
      status: 'Complited'
    },
    { id: 3,
      customer:
        {id: 1, name: 'Dean', state: 'CO-3', email: 'email-3@gmail.com' },
      total: 7,
      placed: new Date(2020, 3, 7),
      fulfilled: new Date(2020, 3, 8),
      status: 'Complited'
    },
    { id: 4,
      customer:
        {id: 1, name: 'Strat', state: 'CO-4', email: 'email-4@gmail.com' },
      total: 16,
      placed: new Date(2020, 4, 10),
      fulfilled: new Date(2020, 4, 11),
      status: 'Complited'
    },
    { id: 5,
      customer:
        {id: 1, name: 'Bakery', state: 'CO-5', email: 'email-5@gmail.com' },
      total: 4,
      placed: new Date(2020, 8, 17),
      fulfilled: new Date(2020, 8, 18),
      status: 'Complited'
    }
  ];