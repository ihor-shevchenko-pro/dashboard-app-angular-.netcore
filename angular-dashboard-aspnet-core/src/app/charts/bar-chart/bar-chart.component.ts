import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/services/sales.service';
import { Order } from 'src/app/core/models/order';
import * as moment from 'moment';

// const SAMPLE_BARCHART_DATA: any[] = [
//   { data: [65, 59, 80, 81, 56, 54, 30], label: 'Q3 Sales'},
//   { data: [25, 39, 60, 91, 36, 54, 50], label: 'Q4 Sales'}
// ];
// const SAMPLE_BARCHART_LABELS: string[] = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'];

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor(private _salesService: SalesService ) { }

  // public barChartData: any[] = SAMPLE_BARCHART_DATA;
  // public barChartLabels: string[] = SAMPLE_BARCHART_LABELS;

  public orders: Order[];
  public orderLabels: string[];
  public orderData: number[];

  public barChartData: any[];
  public barChartLabels: string[];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  ngOnInit(): void {
    this._salesService.getOrders(1, 100)
    .subscribe(res => {
      // console.log(res['page']['data']);
      const localChartData = this.getChartData(res);
      this.barChartLabels = localChartData.map(x => x[0]).reverse();
      this.barChartData = [{ 'data': localChartData.map(x => x[1]), 'label': 'Sales'}];
    });
  }

  public getChartData(res: Order[]) {
    this.orders = res['page']['data'];
    const data = this.orders.map(o => o.orderTotal);
    const formattedOrders = this.orders.reduce((r, e) => {
      r.push([moment(e.placed).format('DD-MM-YYYY'), e.orderTotal]);
      return r;
    }, []);

    const p = [];
    const chartData = formattedOrders.reduce((r, e) => {
      const key = e[0];
      if (!p[key]) {
        p[key] = e;
        r.push(p[key]);
      } else {
        p[key][1] += e[1];
      }
      return r;
    }, []);

    return chartData;

    // const myData = [3, 4, 5].reduce((sum, value) => {
    //   console.log('sum:', sum, 'value:', value);
    //   return sum + value;
    // }, 0);
    // console.log('myData:', myData);
    // console.log(labels);
  }

}
