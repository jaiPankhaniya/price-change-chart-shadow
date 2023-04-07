import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as _ from 'lodash';
import Highcharts = require('highcharts');

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnChanges {
  selectedSeries: number = -1;
  chart: any;
  @Input() data: number[] = [];
  @Input() data1: number[] = [];
  @Input() data2: number[] = [];
  @Input() data3: number[] = [];
  @Input() labels: string[] = [];
  @Input() showPopup = false;
  @Output() close = new EventEmitter<void>();
  @ViewChild('chartContainer') chartContainer: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data || changes.labels) {
      this.updateChart();
    }
  }

  private updateChart(): void {
    const options: Highcharts.Options = {
      colors: ['#FF6138', '#FFFF9D', '#BEEB9F', '#79BD8F', '#00A388'], //series colors.
      title: {
        text: '1/2 SIZE, HEAVY, FOIL STEAM TABLE PAN, HFA, 100/CASE',
      },
      xAxis: {
        categories: this.labels,
      },
      yAxis: {
        title: {
          text: 'Price',
        },
      },
      series: [
        {
          name: '12M',
          data: this.data,
          visible: true,
          type: 'area',
        },
        {
          name: '6M',
          data: this.data1,
          type: 'area',
          visible: false,
        },
        {
          name: '3M',
          data: this.data2,
          type: 'area',
          visible: false,
        },
        {
          name: '1M',
          data: this.data3,
          type: 'area',
          visible: false,
        },
        {
          name: '1D',
          data: this.data,
          type: 'area',
          visible: false,
        },
      ],
      legend: {
        enabled: true,
        itemDistance: 50,
        borderRadius: 2,
      },
      plotOptions: {
        series: {
          events: {
            show: function (event) {
              this.chart.series.forEach((series, i) => {
                if (i != event.target.index) {
                  series.setVisible(false);
                }
              });
            },
          },
        },
      },
    };
    this.chart = Highcharts.chart(this.chartContainer.nativeElement, options);
  }
}
