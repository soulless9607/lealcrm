import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { SalesDataService } from '../../../services/sales-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent {
  salesData: any[] = [];
  salesDataSubscription!: Subscription;
  myChart!: Chart;

  constructor(private salesService: SalesDataService) { }

  ngOnInit(): void {
    this.salesDataSubscription = this.salesService.salesData$.subscribe(data => {
      this.salesData = data;
      this.generateChart();
      
    });
  }

  generateChart(): void {
    const ctx = document.getElementById('salesChart') as HTMLCanvasElement;

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.salesData.map(data => data.period),
        datasets: [{
          label: 'Sales Amount',
          data: this.salesData.map(data => data.amount),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,

      }
    });
  }
  ngOnDestroy(): void {
    this.salesDataSubscription.unsubscribe();
  }
}