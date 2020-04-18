import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/core/models/order';
import { MOCK_ORDERS } from '../../core/shared/mock.orders';

@Component({
  selector: 'app-section-orders',
  templateUrl: './section-orders.component.html',
  styleUrls: ['./section-orders.component.css']
})
export class SectionOrdersComponent implements OnInit {

  constructor() { }

  public orders: Order[] = MOCK_ORDERS;

  ngOnInit(): void {
  }

}
