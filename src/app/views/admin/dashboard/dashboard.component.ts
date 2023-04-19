import { Component } from '@angular/core';
import { numbers } from '@material/toolbar';
import Chart from 'chart.js/auto';
import * as moment from 'moment';
import { ChangementPlanifier } from 'src/app/controller/model/changement-planifier';
import { HealthChekPreprodProd } from 'src/app/controller/model/health-chek-preprod-prod';
import { Incident } from 'src/app/controller/model/incident';
import { Operation } from 'src/app/controller/model/operation';
import { ChangementService } from 'src/app/controller/service/changement.service';
import { HealthCheckRespoService } from 'src/app/controller/service/health-check-respo.service';
import { HealthCheckService } from 'src/app/controller/service/health-check.service';
import { IncidentRespoService } from 'src/app/controller/service/incident-respo.service';
import { OperationService } from 'src/app/controller/service/operation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  listIncident:Array<Incident>=new Array<Incident>();
  listOperation:Array<Operation>=new Array<Operation>();
  listChange:Array<ChangementPlanifier>=new Array<ChangementPlanifier>();
  listHealthCheckProd:Array<HealthChekPreprodProd>=new Array<HealthChekPreprodProd>();
  dateRange = {
    start: moment().startOf('month'),
    end: moment().endOf('month')
  };
  private chart!: Chart;

  constructor(private service: IncidentRespoService,private operationService: OperationService,
    private changeService: ChangementService,private healthprodService: HealthCheckRespoService) { 
  }
 
  
  ngOnInit(): void {
    const date = new Date();
    const year = date.getFullYear();
    this.service.FindAllIncidentAdmin().subscribe(data=>{
      //@ts-ignore
      this.listIncident = data.body;
     this.generateIncidentsPerApplicationChart();
     this.generateIncidentsClosPerLotsChart();
     this.generateIncidentsPerLotChart();
     this.generateIncidentsPerStatutChartMonth();
    });
    this.operationService.FindAllOperationAdmin().subscribe(data=>{
      //@ts-ignore
      this.listOperation = data.body;
     this.generateOperationPerApplicationChart();
     this.generateOperationTerminerPerLotChart();
     this.generateOperationPlanifierPerLotChart();
     this.generateOperationPerStatutChartMonth();
    });
    this.changeService.FindAllChangeAdmin().subscribe(data=>{
      //@ts-ignore
      this.listChange = data.body;
     this.generateChangePerApplicationChart();
     this.generateChangePlanifierPerLotChart();
     this.generateChangeTerminePerLotChart();
     this.generateChangePerStatutChartMonth();
    });
    this.healthprodService.FindAllHealthCheckAdmin().subscribe(data=>{
      //@ts-ignore
      this.listHealthCheckProd = data.body;
     this.generateChartsHealthProd();
     this.updateChart();
    });
  }
 onStartDateChanged(event: Event) {
    const startDateStr = (event.target as HTMLInputElement).value;
    const startDate = moment(startDateStr);
    if (startDate.isValid()) {
      this.dateRange.start = startDate;
      this.updateChart();
    }
  }
  
  onEndDateChanged(event: Event) {
    const endDateStr = (event.target as HTMLInputElement).value;
    const endDate = moment(endDateStr);
    if (endDate.isValid()) {
      this.dateRange.end = endDate;
      this.updateChart();
    }
  }
  
// Chart Incident 
  
  generateIncidentsPerStatutChartMonth() {
    const monthNames = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aout', 'Sep', 'Oct', 'Nov', 'Dec'];
    const statut = Array.from(new Set(this.listIncident.map(incident => incident.statut)));
  
    const incidentsPerApplication = this.listIncident.reduce((acc:any, incident) => {
      const statuts = incident.statut;
      const dateDebut = new Date(incident.dateAjout);
      if (isNaN(dateDebut.getMonth())) {
        // Skip this incident if dateDebut is not a valid date
        return acc;
      }
      const monthIndex = dateDebut.getMonth();
      const monthName = monthNames[monthIndex];
      if (!acc[monthName]) {
        acc[monthName] = {};
      }
      if (!acc[monthName][statuts]) {
        acc[monthName][statuts] = 0;
      }
      acc[monthName][statuts]++;
      return acc;
    }, {});
  
    const datasets = statut.map(title => ({
      label: title,
      data: monthNames.map(monthName => incidentsPerApplication[monthName]?.[title] || 0),
      backgroundColor: this.getRandomColor(),
      fill: true
    }));
  
    const chart = new Chart('incidentsPerStatutChartMonth', {
      type: 'line',
      data: {
        labels: monthNames,
        datasets
      },
      options: {
        aspectRatio: 3.5, // Set the aspect ratio to 2:1
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Nombre d\'incident par mois',
            padding: {
              top: 20,
              bottom: 20
            }
          }
        }
      }
    });
  }

  generateIncidentsPerApplicationChart() {
    const incidentsClosPerApplication = this.listIncident.reduce((acc:any, incident) => {
      if (incident.statut === 'Clos') { 
        const applicationTitle = incident.application.nomApplication;
        if (!acc[applicationTitle]) {
          acc[applicationTitle] = 0;
        }
        acc[applicationTitle]++;
      }
      return acc;
    }, {});
    
    // Group incidents by application for open incidents
    const incidentsOpenPerApplication = this.listIncident.reduce((acc:any, incident) => {
      if (incident.statut === 'Ouvert') { 
        const applicationTitle = incident.application.nomApplication;
        if (!acc[applicationTitle]) {
          acc[applicationTitle] = 0;
        }
        acc[applicationTitle]++;
      }
      return acc;
    }, {});
    
    // Get unique application labels for both datasets
    const allLabels = [...new Set([...Object.keys(incidentsClosPerApplication), ...Object.keys(incidentsOpenPerApplication)])];
  
    // Define colors for open and closed datasets using getRandomColor() function
    const openColors = allLabels.map(label => this.getRandomColor());
    const closedColors = allLabels.map(label => this.getRandomColor());
    
    // Create datasets for both open and closed incidents
    const closedData = allLabels.map(label => incidentsClosPerApplication[label] || 0);
    const openData = allLabels.map(label => incidentsOpenPerApplication[label] || 0);
    
    // Assign colors to datasets
    const backgroundColors = [...closedColors.slice(0, allLabels.length), ...openColors.slice(0, allLabels.length)];
    
    // Create a chart using Chart.js
    const chart = new Chart('combinedChart', {
      type: 'bar',
      data: {
        labels: allLabels,
        datasets: [
          {
            label: 'Nombre d\'Incidents cloturé',
            data: closedData,
            backgroundColor: closedColors.slice(0, allLabels.length),
            borderColor: closedColors.map(color => color.replace('0.5', '1')),
            borderWidth: 1
          },
          {
            label: 'Nombre d\'incident ouvert',
            data: openData,
            backgroundColor: openColors.slice(0, allLabels.length),
            borderColor: openColors.map(color => color.replace('0.5', '1')),
            borderWidth: 1
          }
        ]
      },
      options: {
        aspectRatio: 3.5, // Set the aspect ratio to 2:1
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Nombre d\'incidents ouverts et cloturés par Application',
            padding: {
              top: 20,
              bottom: 20
            }
          }
        }
      }
    });
  }


  

  generateIncidentsClosPerLotsChart() {
    const lots = Array.from(new Set(this.listIncident.map(incident => incident.application.lot)));
  
    const incidentsPerLots = this.listIncident.reduce((acc: any, incident) => {
      const lot = incident.application.lot;
      const statut = incident.statut;
      if (statut === "Clos") {
        if (!acc[lot]) {
          acc[lot] = 0;
        }
        acc[lot]++;
      }
      return acc;
    }, {});
  
    const datasets = lots.map(lot => ({
      label: lot,
      data: [incidentsPerLots[lot] || 0],
      backgroundColor: this.getRandomColor()
    }));
  
    const chart = new Chart('incidentsClosPerLotsChart', {
      type: 'bar',
      data: {
        labels: ['Nombre d\'Incident par lots'],
        datasets
      },
      options: {
        aspectRatio: 2, // Set the aspect ratio to 2:1
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Nombre d\'incident cloturé par lot',
            padding: {
              top: 20,
              bottom: 20
            }
          }
        }
      }
    });
  }
  
  

  
  generateIncidentsPerLotChart() {
    const lots = Array.from(new Set(this.listIncident.map(incident => incident.application.lot)));
  
    const incidentsPerLots = this.listIncident.reduce((acc: any, incident) => {
      const lot = incident.application.lot;
      const statut = incident.statut;
      if (statut === "Ouvert") {
        if (!acc[lot]) {
          acc[lot] = 0;
        }
        acc[lot]++;
      }
      return acc;
    }, {});
  
    const datasets = lots.map(lot => ({
      label: lot,
      data: [incidentsPerLots[lot] || 0],
      backgroundColor: this.getRandomColor()
    }));
  
    const chart = new Chart('incidentsPerLotsChart', {
      type: 'bar',
      data: {
        labels: ['Nombre d\'Incident par lots'],
        datasets
      },
      options: {
        aspectRatio: 2, // Set the aspect ratio to 2:1
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Nombre d\'incident ouvert par lot',
            padding: {
              top: 20,
              bottom: 20
            }
          }
        }
      }
    });
  }



  // chart Operation 

  generateOperationPerStatutChartMonth() {
    const monthNames = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aout', 'Sep', 'Oct', 'Nov', 'Dec'];
    const statut = Array.from(new Set(this.listOperation.map(operation => operation.statut)));
  
    const operationPerApplication = this.listOperation.reduce((acc:any, operation) => {
      const statuts = operation.statut;
      const dateDebut = new Date(operation.dateAjout);
      if (isNaN(dateDebut.getMonth())) {
        // Skip this incident if dateDebut is not a valid date
        return acc;
      }
      const monthIndex = dateDebut.getMonth();
      const monthName = monthNames[monthIndex];
      if (!acc[monthName]) {
        acc[monthName] = {};
      }
      if (!acc[monthName][statuts]) {
        acc[monthName][statuts] = 0;
      }
      acc[monthName][statuts]++;
      return acc;
    }, {});
  
    const datasets = statut.map(title => ({
      label: title,
      data: monthNames.map(monthName => operationPerApplication[monthName]?.[title] || 0),
      backgroundColor: this.getRandomColor(),
      fill:true
    }));
  
    const chart = new Chart('operationPerStatutChartMonth', {
      type: 'line',
      data: {
        labels: monthNames,
        datasets
      },
      options: {
        aspectRatio: 3.5, // Set the aspect ratio to 2:1
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  generateOperationPerApplicationChart() {
    const OperationPlanifierPerApplication = this.listOperation.reduce((acc:any, operation) => {
      if (operation.statut === 'Planifier') { 
        const applicationTitle = operation.application.nomApplication;
        if (!acc[applicationTitle]) {
          acc[applicationTitle] = 0;
        }
        acc[applicationTitle]++;
      }
      return acc;
    }, {});
    
    const OperationTerminePerApplication = this.listOperation.reduce((acc:any, operation) => {
      if (operation.statut === 'Terminer') { 
        const applicationTitle = operation.application.nomApplication;
        if (!acc[applicationTitle]) {
          acc[applicationTitle] = 0;
        }
        acc[applicationTitle]++;
      }
      return acc;
    }, {});
    
    // Get unique application labels for both datasets
    const allLabels = [...new Set([...Object.keys(OperationPlanifierPerApplication), ...Object.keys(OperationTerminePerApplication)])];
  
    // Define colors for open and closed datasets using getRandomColor() function
    const openColors = allLabels.map(label => this.getRandomColor());
    const closedColors = allLabels.map(label => this.getRandomColor());
    // Create datasets for both open and closed incidents
    const closedData = allLabels.map(label => OperationPlanifierPerApplication[label] || 0);
    const openData = allLabels.map(label => OperationTerminePerApplication[label] || 0);
    
    // Assign colors to datasets
    const backgroundColors = [...closedColors.slice(0, allLabels.length), ...openColors.slice(0, allLabels.length)];
    
    // Create a chart using Chart.js
    const chart = new Chart('operationPerApplicationChart', {
      type: 'bar',
      data: {
        labels: allLabels,
        datasets: [
          {
            label: 'Nombre d\'operation planifier',
            data: closedData,
            backgroundColor: closedColors.slice(0, allLabels.length),
            borderColor: closedColors.map(color => color.replace('0.5', '1')),
            borderWidth: 1
          },
          {
            label: 'Nombre d\'operation terminer',
            data: openData,
            backgroundColor: openColors.slice(0, allLabels.length),
            borderColor: openColors.map(color => color.replace('0.5', '1')),
            borderWidth: 1
          }
        ]
      },
      options: {
        aspectRatio: 3.5, // Set the aspect ratio to 2:1
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Nombre d\'operation planifier et terminer par Application',
            padding: {
              top: 20,
              bottom: 20
            }
          }
        }
      }
    });
  }

  generateOperationTerminerPerLotChart() {
    const lots = Array.from(new Set(this.listOperation.map(operation => operation.application.lot)));
  
    const operationPerLots = this.listOperation.reduce((acc: any, op) => {
      const lot = op.application.lot;
      const statut = op.statut;
      if (statut === "Terminer") {
        if (!acc[lot]) {
          acc[lot] = 0;
        }
        acc[lot]++;
      }
      return acc;
    }, {});
  
    const datasets = lots.map(lot => ({
      label: lot,
      data: [operationPerLots[lot] || 0],
      backgroundColor: this.getRandomColor()
    }));
  
    const chart = new Chart('operationTerminerPerLotsChart', {
      type: 'bar',
      data: {
        labels: ['Nombre d\'operation terminer par lots'],
        datasets
      },
      options: {
        aspectRatio: 2, // Set the aspect ratio to 2:1
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Nombre d\'operation terminer par lots',
            padding: {
              top: 20,
              bottom: 20
            }
          }
        }
      }
    });
  }
  
  

  
  generateOperationPlanifierPerLotChart() {
    const lots = Array.from(new Set(this.listOperation.map(operation => operation.application.lot)));
  
    const operationPerLots = this.listOperation.reduce((acc: any, op) => {
      const lot = op.application.lot;
      const statut = op.statut;
      if (statut === "Planifier") {
        if (!acc[lot]) {
          acc[lot] = 0;
        }
        acc[lot]++;
      }
      return acc;
    }, {});
  
    const datasets = lots.map(lot => ({
      label: lot,
      data: [operationPerLots[lot] || 0],
      backgroundColor: this.getRandomColor()
    }));
  
    const chart = new Chart('operationPlannedPerLotsChart', {
      type: 'bar',
      data: {
        labels: ['Nombre d\'operation planifier par lots'],
        datasets
      },
      options: {
        aspectRatio: 2, // Set the aspect ratio to 2:1
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Nombre d\'operation planifier par lots',
            padding: {
              top: 20,
              bottom: 20
            }
          }
        }
      }
    });
  }
    
 

// chart changement 
generateChangePerStatutChartMonth() {
  const monthNames = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aout', 'Sep', 'Oct', 'Nov', 'Dec'];

  const statut = Array.from(new Set(this.listChange.map(change => change.statut)));

  const changePerApplication = this.listChange.reduce((acc:any, change) => {
    const statuts = change.statut;
    const dateDebut = new Date(change.dateAjout);
    if (isNaN(dateDebut.getMonth())) {
      // Skip this incident if dateDebut is not a valid date
      return acc;
    }
    const monthIndex = dateDebut.getMonth();
    const monthName = monthNames[monthIndex];
    if (!acc[monthName]) {
      acc[monthName] = {};
    }
    if (!acc[monthName][statuts]) {
      acc[monthName][statuts] = 0;
    }
    acc[monthName][statuts]++;
    return acc;
  }, {});

  const datasets = statut.map(title => ({
    label: title,
    data: monthNames.map(monthName => changePerApplication[monthName]?.[title] || 0),
    backgroundColor: this.getRandomColor(),
    fill:true
  }));

  const chart = new Chart('changePerStatutChartMonth', {
    type: 'line',
    data: {
      labels: monthNames,
      datasets
    },
    options: {
      aspectRatio: 3.5, // Set the aspect ratio to 2:1
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
generateChangePerApplicationChart() {
  const changementPlanifierPerApplication = this.listChange.reduce((acc:any, change) => {
    if (change.statut === 'Planifié') { 
      const applicationTitle = change.application.nomApplication;
      if (!acc[applicationTitle]) {
        acc[applicationTitle] = 0;
      }
      acc[applicationTitle]++;
    }
    return acc;
  }, {});
  
  const changementTerminePerApplication = this.listChange.reduce((acc:any, change) => {
    if (change.statut === 'Terminé avec succès') { 
      const applicationTitle = change.application.nomApplication;
      if (!acc[applicationTitle]) {
        acc[applicationTitle] = 0;
      }
      acc[applicationTitle]++;
    }
    return acc;
  }, {});
  
  // Get unique application labels for both datasets
  const allLabels = [...new Set([...Object.keys(changementPlanifierPerApplication), ...Object.keys(changementTerminePerApplication)])];

  // Define colors for open and closed datasets
   // Define colors for open and closed datasets using getRandomColor() function
   const openColors = allLabels.map(label => this.getRandomColor());
   const closedColors = allLabels.map(label => this.getRandomColor());
  // Create datasets for both open and closed incidents
  const closedData = allLabels.map(label => changementPlanifierPerApplication[label] || 0);
  const openData = allLabels.map(label => changementTerminePerApplication[label] || 0);
  
  // Assign colors to datasets
  const backgroundColors = [...closedColors.slice(0, allLabels.length), ...openColors.slice(0, allLabels.length)];
  
  // Create a chart using Chart.js
  const chart = new Chart('changePerApplicationChart', {
    type: 'bar',
    data: {
      labels: allLabels,
      datasets: [
        {
          label: 'Nombre de changement planifier',
          data: closedData,
          backgroundColor: closedColors.slice(0, allLabels.length),
          borderColor: closedColors.map(color => color.replace('0.5', '1')),
          borderWidth: 1
        },
        {
          label: 'Nombre de changement terminer',
          data: openData,
          backgroundColor: openColors.slice(0, allLabels.length),
          borderColor: openColors.map(color => color.replace('0.5', '1')),
          borderWidth: 1
        }
      ]
    },
    options: {
      aspectRatio: 3.5, // Set the aspect ratio to 2:1
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Nombre de changement planifier et terminer par Application',
          padding: {
            top: 20,
            bottom: 20
          }
        }
      }
    }
  });
}
generateChangeTerminePerLotChart() {
  const lots = Array.from(new Set(this.listChange.map(change => change.application.lot)));

  const changePerLots = this.listChange.reduce((acc: any, change) => {
    const lot = change.application.lot;
    const statut = change.statut;
    if (statut === "Terminé avec succès") {
      if (!acc[lot]) {
        acc[lot] = 0;
      }
      acc[lot]++;
    }
    return acc;
  }, {});

  const datasets = lots.map(lot => ({
    label: lot,
    data: [changePerLots[lot] || 0],
    backgroundColor: this.getRandomColor()
  }));

  const chart = new Chart('changeTerminerPerLotsChart', {
    type: 'bar',
    data: {
      labels: ['Nombre de changement terminer par lots'],
      datasets
    },
    options: {
      aspectRatio: 2, // Set the aspect ratio to 2:1
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Nombre de changement terminer par lots',
          padding: {
            top: 20,
            bottom: 20
          }
        }
      }
    }
  });
}

generateChangePlanifierPerLotChart() {
  const lots = Array.from(new Set(this.listChange.map(change => change.application.lot)));

  const changePerLots = this.listChange.reduce((acc: any, change) => {
    const lot = change.application.lot;
    const statut = change.statut;
    if (statut === "Planifié") {
      if (!acc[lot]) {
        acc[lot] = 0;
      }
      acc[lot]++;
    }
    return acc;
  }, {});

  const datasets = lots.map(lot => ({
    label: lot,
    data: [changePerLots[lot] || 0],
    backgroundColor: this.getRandomColor()
  }));

  const chart = new Chart('changePlannedPerLotsChart', {
    type: 'bar',
    data: {
      labels: ['Nombre de changement planifier par lots'],
      datasets
    },
    options: {
      aspectRatio: 2, // Set the aspect ratio to 2:1
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Nombre de changement planifier par lots',
          padding: {
            top: 20,
            bottom: 20
          }
        }
      }
    }
  });
}

///////////////////////////////
getHealthCheckPerWeekOfCurrentMonth(): number[] {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const startDate = new Date(startOfMonth);
  startDate.setDate(startDate.getDate() - startDate.getDay() + 1); // get the start date of the first week of the month
  const endDate = new Date(endOfMonth);
  endDate.setDate(endDate.getDate() - endDate.getDay() + 7); // get the end date of the last week of the month
  const numWeeks = Math.ceil((endDate.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
  const healthCheckPerWeek = new Array(numWeeks).fill(0);

  this.listHealthCheckProd.forEach(healthCheck => {
    const date = new Date(healthCheck.dateAjout);
    if (date >= startDate && date <= endDate) {
      const weekIndex = Math.floor((date.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
      healthCheckPerWeek[weekIndex]++;
    }
  });

  return healthCheckPerWeek;
}
private getWeekLabels(): string[] {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const startDate = new Date(startOfMonth);
  const endDate = new Date(startOfMonth);
  startDate.setDate(startDate.getDate() - startDate.getDay() + 1); // get the start date of the first week of the month
  endDate.setDate(endDate.getDate() - endDate.getDay() ); // get the start date of the first week of the month

  const numWeeks = this.getHealthCheckPerWeekOfCurrentMonth().length;
  const labels = new Array(numWeeks).fill(0);
  for (let i = 0; i < numWeeks; i++) {
    const startOfWeek = new Date(startDate.getTime() + i * 7 * 24 * 60 * 60 * 1000);
    const endOfWeek = new Date(endDate.getTime() + (i + 1) * 7 * 24 * 60 * 60 * 1000 );
    const startWeekLabel = startOfWeek.toLocaleDateString(undefined, { day: '2-digit', month: '2-digit' });
    const endWeekLabel = endOfWeek.toLocaleDateString(undefined, { day: '2-digit', month: '2-digit' });
    labels[i] = `(${startWeekLabel} - ${endWeekLabel})`;
  }

  return labels;
}
getHealthCheckPerDayOfCurrentWeek(): number[] {
  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay();
  const firstDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDayOfWeek);
  const healthCheckCounts: number[] = new Array(7).fill(0);

  this.listHealthCheckProd.forEach(healthCheck => {
    const healthCheckDate = new Date(healthCheck.dateAjout);
    if (healthCheckDate >= firstDayOfWeek ) {
      const dayOfWeek = healthCheckDate.getDay();
      healthCheckCounts[dayOfWeek]++;

    }
  });
  return healthCheckCounts;
}
getHealthCheckPerMonthOfCurrentYear(): number[] {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const healthCheckCounts: number[] = new Array(12).fill(0);

  this.listHealthCheckProd.forEach(healthCheck => {
    const healthCheckDate = new Date(healthCheck.dateAjout);
    if (healthCheckDate.getFullYear() === currentYear) {
      const monthIndex = healthCheckDate.getMonth();
      healthCheckCounts[monthIndex]++;
    }
  });

  return healthCheckCounts;
}
generateChartsHealthProd(): void {
  // Chart for health check per week
  const healthCheckPerWeekChart = new Chart('healthCheckPerWeekChart', {
    type: 'line',
    data: {
      labels: this.getWeekLabels(),
      datasets: [{
        label: 'Health Check Per Week',
        data: this.getHealthCheckPerWeekOfCurrentMonth(),
        backgroundColor: this.getRandomColor(),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Nombre d\'état de santé par semaine',
          padding: {
            top: 20,
            bottom: 20
          }
        }
      }
    }
  });

  // Chart for health check per day
  const healthCheckPerDayChart = new Chart('healthCheckPerDayChart', {
    type: 'bar',
    data: {
      labels: ['Dimanch', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
      datasets: [{
        label: 'Health Check Per Day',
        data: this.getHealthCheckPerDayOfCurrentWeek(),
        backgroundColor: this.getRandomColor(),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Nombre d\'état de santé par jour',
          padding: {
            top: 20,
            bottom: 20
          }
        }
      }
    }
  });

  // Chart for health check per month
  const healthCheckPerMonthChart = new Chart('healthCheckPerMonthChart', {
    type: 'bar',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aout', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Health Check Per Month',
        data: this.getHealthCheckPerMonthOfCurrentYear(),
        backgroundColor: this.getRandomColor(),
        borderWidth: 1
      }]
    },
    options: {
      aspectRatio: 3.5, // Set the aspect ratio to 2:1
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Nombre d\'état de santé par mois',
          padding: {
            top: 20,
            bottom: 20
          }
        }
      }
    }
  });
}
private updateChart() {
  if (this.chart) {
    this.chart.destroy();
  }

  const startDate = this.dateRange.start.toDate();
  const endDate = this.dateRange.end.toDate();

  // Set Monday as the first day of the week
  moment.updateLocale('en', {
    week: {
      dow: 1 // Monday
    }
  });

  const numHealthChecksPerDay: {[date: string]: number} = {};
  let totalNumHealthChecks = 0;
  
  this.listHealthCheckProd.forEach((hc) => {
    const date = moment(hc.dateAjout).format('YYYY-MM-DD');
    if (moment(date).isBetween(startDate, endDate, null, '[]')) {
      if (!numHealthChecksPerDay[date]) {
        numHealthChecksPerDay[date] = 1;
      } else {
        numHealthChecksPerDay[date]++;
      }
      totalNumHealthChecks++;
    }
  });

  const dates = Object.keys(numHealthChecksPerDay).sort();
  const numHealthChecks = dates.map(date => numHealthChecksPerDay[date]);

  const ctx = document.getElementById('health-check-chart') as HTMLCanvasElement;
  this.chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [moment(startDate).format('DD/MM') + ' - ' + moment(endDate).format('DD/MM')],
      datasets: [{
        label: 'Number of health checks',
        data: [totalNumHealthChecks],
        backgroundColor: this.getRandomColor(),
        borderWidth: 1,
        barPercentage: 0.4
      }]
    },
    options: {
      aspectRatio: 3.5, // Set the aspect ratio to 2:1
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Nombre total d\'états de santé dans la période du ' + moment(startDate).format('DD/MM/YYYY') + ' au ' + moment(endDate).format('DD/MM/YYYY'),
          padding: {
            top: 20,
            bottom: 20
          }
        }
      }
    }
  });
}

   getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.5)`;
   }
  
}
