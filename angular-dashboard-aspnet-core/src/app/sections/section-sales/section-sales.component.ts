import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-section-sales',
  templateUrl: './section-sales.component.html',
  styleUrls: ['./section-sales.component.css']
})
export class SectionSalesComponent implements OnInit {

  constructor(private _serviceSales: SalesService) { }

  public salesDataByCustomer: any;
  public salesDataByState: any;

  ngOnInit() {
    this._serviceSales.getOrdersByState().subscribe(res => {
      this.salesDataByState = res;
    });

    this._serviceSales.getOrdersByCustomer(5).subscribe(res => {
      this.salesDataByCustomer = res;
    });
  }

}
