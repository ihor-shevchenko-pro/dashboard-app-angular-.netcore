import { Component, OnInit } from '@angular/core';
import { LINE_CHART_COLORS } from '../../core/shared/chart.color';
import { SalesService } from 'src/app/services/sales.service';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/core/models/order';

// const LINE_CHART_SAMPLE_DATA: any[] = [
//   { data: [32, 14, 46, 23, 38, 56], label: 'Sentiment Analysis'},
//   { data: [12, 18, 26, 13, 28, 26], label: 'Image Recognition'},
//   { data: [52, 34, 49, 53, 68, 62], label: 'Forecasting'},
// ];
// const LINE_CHART_LABELS: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  constructor(private _salesService: SalesService) { }

  // lineChartData: any [] = LINE_CHART_SAMPLE_DATA;
  // lineChartLabels: any [] = LINE_CHART_LABELS;

  public topCustomers: string[];
  public allOrders: Order[];

  public lineChartData: any [];
  public lineChartLabels: any [];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartLegend: true;
  public lineChartType = 'line';
  public lineChartColors = LINE_CHART_COLORS;

  ngOnInit(): void {
    this._salesService.getOrders(1, 100).subscribe(res => {
      this.allOrders = res['page']['data'];

      this._salesService.getOrdersByCustomer(3).subscribe(customer => {
        this.topCustomers = customer.map(x => x['name']);

        const allChartData = this.topCustomers.reduce((result, i) => {
          result.push(this.getChartData(this.allOrders, i));
          return result;
        }, []);

        let dates = allChartData.map(x => x['data']).reduce((a, i) => {
          a.push(i.map(o => new Date(o[0])));
          return a;
        }, []);

        dates = [].concat.apply([], dates);
        // console.log('dates:', dates);

        const r = this.getCustomerOrdersByDate(allChartData, dates)['data'];
        // console.log('r:', r);

        this.lineChartLabels = r[0]['orders'].map(o => o['date']);

        this.lineChartData = [
          { 'data': r[0].orders.map(x => x.total), 'label': r[0]['customer']},
          { 'data': r[1].orders.map(x => x.total), 'label': r[1]['customer']},
          { 'data': r[2].orders.map(x => x.total), 'label': r[2]['customer']}
        ];

      });
    });
  }

  public getChartData(allOrders: any, name: string) {
    const customerOrders = allOrders.filter(o => o.customer.name === name);
    // console.log('name:', name, 'customerOrders:', customerOrders);

    const formattedOrders = customerOrders.reduce((r, e) => {
      r.push([e.placed, e.total]);
      return r;
    }, []);

    // console.log('formattedOrders:', formattedOrders);
    const result = { customer: name, data: formattedOrders };

    // console.log('result:', result);
    return result;
  }

  public getCustomerOrdersByDate(orders: any, dates: any) {
    // for each customer -> for each date =>
    // { data: [{'customer': 'XYZ', 'orders': [{ 'date': '17-11-25', total: 2421}, {}]}, {}, {}]}
    const customers = this.topCustomers;
    const prettyDates = dates.map(x => this.toFriendlyDate(x));
    const u = Array.from(new Set(prettyDates)).sort();
    // console.log(u);

    // define our result object to return:
    const result = {};
    const dataSets = result['data'] = [];

    customers.reduce((x, y, i) => {
      // console.log('Reducing:', y, 'at index:', i);
      const customerOrders = [];
      dataSets[i] = {
        customer: y, orders:
        u.reduce((r, e, j) => {
          const obj = {};
          obj['date'] = e;
          obj['total'] = this.getCustomerDateTotal(e, y); // sum total orders for this customer on this day
          customerOrders.push(obj);
          // console.log('Reducing:', e, 'at index:', j, 'customerOrders', customerOrders);
          return customerOrders;
        })
      };
      return x;
    }, []);

    return result;
  }

  public toFriendlyDate(date: Date) {
    return moment(date).endOf('day').format('DD-MM-YYYY');
  }

  public getCustomerDateTotal(date: any, customer: string) {
    const r = this.allOrders.filter(o => o.customer.name === customer
      && this.toFriendlyDate(o.placed) === date);

    const result = r.reduce((a, b) => {
      return a + b.orderTotal;
    }, 0);

    return result;
  }

}
