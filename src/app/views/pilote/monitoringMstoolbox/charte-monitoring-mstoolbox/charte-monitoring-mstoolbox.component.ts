import { Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import * as moment from 'moment';
import { MonitoringMstoolbox } from 'src/app/controller/model/monitoring-mstoolbox';
import { User } from 'src/app/controller/model/user';
import { AuthService } from 'src/app/controller/service/auth.service';
import { CharteService } from 'src/app/controller/service/charte.service';
import { MonitoringMstoolboxService } from 'src/app/controller/service/monitoring-mstoolbox.service';

@Component({
  selector: 'app-charte-monitoring-mstoolbox',
  templateUrl: './charte-monitoring-mstoolbox.component.html',
  styleUrls: ['./charte-monitoring-mstoolbox.component.css']
})
export class CharteMonitoringMstoolboxComponent {
  chart!: Chart;
  chartSmile!: Chart;
  @ViewChild('myDialog',{static:false}) filterComponent!: ElementRef;
  @ViewChild('ChartHandBid')
  chartCanvas!: ElementRef;
  @ViewChild('ChartSmile')
  chartCanv!: ElementRef;
  constructor(private authService: AuthService,private charteService: CharteService,private monitoringService: MonitoringMstoolboxService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.createChart();
    this.createChartSmile();
  }
  get User(): User {
    return this.authService.User;
  }
  set User(value: User) {
    this.authService.User = value;
  }
  
  get charteMonitoringMstoolbox(): boolean {
    return this.charteService.charteMonitoringMstoolbox;
  }

  set charteMonitoringMstoolbox(value: boolean) {
    this.charteService.charteMonitoringMstoolbox = value;
  }
  get AddMonitoringMstoolbox(): MonitoringMstoolbox{
    return this.monitoringService.AddMonitoringMstoolbox;
  }

  set AddMonitoringMstoolbox(value: MonitoringMstoolbox) {
    this.monitoringService.AddMonitoringMstoolbox = value;
  }
  createChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    
    // Extract data from this.AddMonitoringMstoolbox.transactionHandbidList
    const dates = this.AddMonitoringMstoolbox.transactionHandbidList.map(item => moment(item.date).format('MM/DD/YYYY'));
    const requets = this.AddMonitoringMstoolbox.transactionHandbidList.map(item => item.nombreRequet);
    const requetsNontraite = this.AddMonitoringMstoolbox.transactionHandbidList.map(item => item.nombreRequetNontraite);
  
    // Create a chart using Chart.js
    this.chart = new Chart('ChartHandBid', {
      type: 'bar',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Number of requests',
            data: requets,
            backgroundColor: '#4472C4',
            borderColor: '#4472C4',
            borderWidth: 1,
            barPercentage: 0.8, // Adjust the bar width
            categoryPercentage: 0.9 // Adjust the space between bars
          },
          {
            label: 'Number of Untreated requests',
            data: requetsNontraite,
            backgroundColor: '#ED7D31',
            borderColor: '#ED7D31',
            borderWidth: 1,
            barPercentage: 0.8, // Adjust the bar width
            categoryPercentage: 0.9, // Adjust the space between bars            
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: 'black',
              font: {
                size: 16 // Set the font size of the x-axis labels
              }
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            },
            
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: {
                weight: 'bold',
                size: 14
              },
            }
          },
          title: {
            display: true,
            text: 'HANDBIP | Number of Requests(Total /Untreated)',
            font: {
              weight: 'bold',
              size: 20
            }
          },
         
        }
      }
    });
  }
  createChartSmile() {
    if (this.chartSmile) {
      this.chartSmile.destroy();
    }
    
    const dates = this.AddMonitoringMstoolbox.transactionSmileList.map(item => moment(item.date).format('MM/DD/YYYY'));
    const requets = this.AddMonitoringMstoolbox.transactionSmileList.map(item => item.nombreRequet);
    const requetsNontraite = this.AddMonitoringMstoolbox.transactionSmileList.map(item => item.nombreRequetNontraite);
  
    // Create a chart using Chart.js
    this.chartSmile = new Chart('ChartSmile', {
      type: 'bar',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Number of requests',
            data: requets,
            backgroundColor: '#4472C4',
            borderColor: '#4472C4',
            borderWidth: 1,
            barPercentage: 0.8, // Adjust the bar width
            categoryPercentage: 0.9 // Adjust the space between bars
          },
          {
            label: 'Number of Untreated requests',
            data: requetsNontraite,
            backgroundColor: '#ED7D31',
            borderColor: '#ED7D31',
            borderWidth: 1,
            barPercentage: 0.8, // Adjust the bar width
            categoryPercentage: 0.9, // Adjust the space between bars            
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: 'black',
              font: {
                size: 16 // Set the font size of the x-axis labels
              }
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            },
            
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: {
                weight: 'bold',
                size: 14
              },
            }
          },
          title: {
            display: true,
            text: 'SMILEE | Number of Requests(Total /Untreated)',
            font: {
              weight: 'bold',
              size: 20
            }
          },
         
        }
      }
    });
  }
}
