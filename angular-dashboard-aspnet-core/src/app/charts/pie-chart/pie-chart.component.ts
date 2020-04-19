import { Component, OnInit, Input } from '@angular/core';
import _ from 'lodash';
import { THEME_COLORS } from '../../core/shared/theme.colors';

const theme = 'Bright';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  constructor() { }

  @Input() inputData: any;
  @Input() limit: number;

  // pieChartData: number[] = [350, 450, 120];
  // pieChartLabels: string[] = ['XYZ Logistics', 'Main St Bakery', 'Acme Hosting'];
  // colors: any[] = [
  // {
  //   backgroundColor: ['#26547c', '#ff6b64', '#ffd166'],
  //   borderColor: '#111'
  // }

  public pieChartData: number[];
  public pieChartLabels: string[];
  colors: any[] = [
    {
      backgroundColor: this.themeColors(theme),
      borderColor: '#111'
    }
  ];
  pieChartType = 'doughnut';
  
  ngOnInit(): void {
    this.parseChartData(this.inputData, this.limit);
  }

  private parseChartData(res: any, limit?: number) {
    const allData = res.slice(0, limit);
    // console.log(allData);
    this.pieChartData = allData.map(x => _.values(x)[1]);
    this.pieChartLabels = allData.map(x => _.values(x)[0]);
  }

  public themeColors(setName: string): string[] {
    const color = THEME_COLORS.slice(0)
      .find(set => set.name === setName).colorSet;
    return color;
  }

}
