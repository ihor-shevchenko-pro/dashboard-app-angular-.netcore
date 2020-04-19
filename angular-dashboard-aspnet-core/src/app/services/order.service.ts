import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Order } from '../core/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http: HttpClient) { }

  public getOrders(pageIndex: number, pageSize: number) {
    return this._http.get<Order>('http://localhost:5000/api/order/' + pageIndex + '/' + pageSize)
      .pipe(map(res => res));
  }

  public getOrdersByCustomer(number: number) {
    return this._http.get('http://localhost:5000/api/order/by_customer/' + number)
      .pipe(map(res => res));
  }

  public getOrdersByState() {
    return this._http.get('http://localhost:5000/api/order/by_state/')
      .pipe(map(res => res));
  }

}