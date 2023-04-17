import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChangementPlanifier } from 'src/app/controller/model/changement-planifier';
import { Incident } from 'src/app/controller/model/incident';
import { Operation } from 'src/app/controller/model/operation';
import { ChangementService } from 'src/app/controller/service/changement.service';
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
  constructor(private service: IncidentRespoService,private operationService: OperationService,private changeService: ChangementService) { 
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
  }
// Chart Incident 
  
  generateIncidentsPerStatutChartMonth() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
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
  
    // Define colors for open and closed datasets
    const openColors = ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)', 'rgba(255, 159, 64, 0.5)'];
    const closedColors = ['rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)', 'rgb(255, 255, 0)', 'rgb(255, 0, 255)', 'rgb(0, 255, 255)'];
  
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
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
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
  
    // Define colors for open and closed datasets
    const openColors = ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)', 'rgba(255, 159, 64, 0.5)'];
    const closedColors = ['rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)', 'rgb(255, 255, 0)', 'rgb(255, 0, 255)', 'rgb(0, 255, 255)'];
  
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
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
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
  const openColors = ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)', 'rgba(255, 159, 64, 0.5)'];
  const closedColors = ['rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)', 'rgb(255, 255, 0)', 'rgb(255, 0, 255)', 'rgb(0, 255, 255)'];

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
   getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.5)`;
   }
  
}
