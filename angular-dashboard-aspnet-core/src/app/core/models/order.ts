import { Customer } from './customer';

export interface Order {
    id: number;
    customer: Customer;
    orderTotal: number;
    placed: Date;
    completed: Date;
    status: string;
}