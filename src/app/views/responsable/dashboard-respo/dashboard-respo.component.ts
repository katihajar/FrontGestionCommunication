import { Component } from '@angular/core';
import { ChangementPlanifier } from 'src/app/controller/model/changement-planifier';
import { Incident } from 'src/app/controller/model/incident';
import { Operation } from 'src/app/controller/model/operation';
import { ChangementService } from 'src/app/controller/service/changement.service';
import { OperationService } from 'src/app/controller/service/operation.service';
import Chart from 'chart.js/auto';
import { IncidentRespoService } from 'src/app/controller/service/incident-respo.service';

@Component({
  selector: 'app-dashboard-respo',
  templateUrl: './dashboard-respo.component.html',
  styleUrls: ['./dashboard-respo.component.scss']
})
export class DashboardRespoComponent {

  listIncident:Array<Incident>=new Array<Incident>();
  listOperation:Array<Operation>=new Array<Operation>();
  listChange:Array<ChangementPlanifier>=new Array<ChangementPlanifier>();
  constructor(private service: IncidentRespoService,private operationService: OperationService,private changeService: ChangementService) { 
  }

  ngOnInit(): void {
    const date = new Date();
    const year = date.getFullYear();
    this.service.FindAllIncident().subscribe(data=>{
      //@ts-ignore
      this.listIncident = data.body;
     this.generateIncidentsPerApplicationChart();
     this.generateIncidentsPerMonthChart(year);
     this.generateIncidentsPerLotChart();
     this.generateIncidentsPerStatutChart();
     this.generateIncidentsPerStatutChartMonth();
    });
    this.operationService.FindAllOperationRespo().subscribe(data=>{
      //@ts-ignore
      this.listOperation = data.body;
     this.generateOperationPerApplicationChart();
     this.generateOperationPerMonthChart(year);
     this.generateOperationPerLotChart();
     this.generateOperationPerStatutChart();
     this.generateOperationPerStatutChartMonth();
    });
    this.changeService.FindAllChangeRespo().subscribe(data=>{
      //@ts-ignore
      this.listChange = data.body;
     this.generateChangePerApplicationChart();
     this.generateChangePerMonthChart(year);
     this.generateChangePerLotChart();
     this.generateChangePerStatutChart();
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
      backgroundColor: this.getRandomColor()
    }));
  
    const chart = new Chart('incidentsPerStatutChartMonth', {
      type: 'bar',
      data: {
        labels: monthNames,
        datasets
      },
      options: {
        aspectRatio: 3, // Set the aspect ratio to 2:1
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  generateIncidentsPerApplicationChart() {
    // Group incidents by application
    const incidentsPerApplication = this.listIncident.reduce((acc:any, incident) => {
      if (incident.statut === 'Ouvert') { // only count incidents with statut equal to "Ouvert"
        const applicationTitle = incident.application.nomApplication;
        if (!acc[applicationTitle]) {
          acc[applicationTitle] = 0;
        }
        acc[applicationTitle]++;
      }
      return acc;
    }, {});
  
    // Convert the incidents per application object into two arrays for labels and data
    const labels = Object.keys(incidentsPerApplication);
    const data = Object.values(incidentsPerApplication);
    const backgroundColors = Array.from({ length: labels.length }, () => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgba(${r}, ${g}, ${b}, 0.5)`;
    });
    // Create a chart using Chart.js
    const chart = new Chart('incidentsPerApplicationChart', {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            label: 'Number of Incidents',
            data,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors.map(color => color.replace('0.5', '1')),
     
            borderWidth: 1
          }
        ]
      },
      options: {
        aspectRatio: 1.1, // Set the aspect ratio to 2:1
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
     
    });
  }

  

  generateIncidentsPerMonthChart(year: number) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const incidentsPerMonth = this.listIncident.reduce((acc: any, incident) => {
      const dateAjout = new Date(incident.dateAjout);
      if (isNaN(dateAjout.getMonth())) {
        // Skip this incident if dateAjout is not a valid date
        return acc;
      }
      const incidentYear = dateAjout.getFullYear();
      if (incidentYear !== year) {
        // Skip this incident if it's not from the specified year
        return acc;
      }
      const monthIndex = dateAjout.getMonth();
      const monthName = monthNames[monthIndex];
      if (!acc[monthName]) {
        acc[monthName] = 0;
      }
      if (incident.statut === 'Ouvert') {
        acc[monthName]++;
      }
      return acc;
    }, {});
    
    const datasets = [{
      label: 'Incidents ouverts par Mois',
      data: monthNames.map(monthName => incidentsPerMonth[monthName] || 0),
      backgroundColor: this.getRandomColor()
    }];
    
    const chart = new Chart('incidentsPerMonthChart', {
      type: 'line',
      data: {
        labels: monthNames,
        datasets
      },
      options: {
        aspectRatio: 2, // Set the aspect ratio to 2:1
        scales: {
          y: {
            beginAtZero: true
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
        }
      }
    });
  }

  generateIncidentsPerStatutChart() {
    const statuts = Array.from(new Set(this.listIncident.map(incident => incident.statut)));
  
    const incidentsPerStatut = this.listIncident.reduce((acc: any, incident) => {
      const statut = incident.statut;
      if (!acc[statut]) {
        acc[statut] = 0;
      }
      acc[statut]++;
      return acc;
    }, {});

      // Convert the incidents per application object into two arrays for labels and data
      const labels = Object.keys(incidentsPerStatut);
      const data = Object.values(incidentsPerStatut);
        const backgroundColors = Array.from({ length: labels.length }, () => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgba(${r}, ${g}, ${b}, 0.5)`;
    });
     // Create a chart using Chart.js
    const chart = new Chart('incidentsPerStatutChart', {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            label: 'Number of Incidents',
            data,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors.map(color => color.replace('0.5', '1')),
            borderWidth: 1
          }
        ]
      },
      options: {
        aspectRatio: 1.1, // Set the aspect ratio to 2:1
        scales: {
          y: {
            beginAtZero: true
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
      backgroundColor: this.getRandomColor()
    }));
  
    const chart = new Chart('operationPerStatutChartMonth', {
      type: 'bar',
      data: {
        labels: monthNames,
        datasets
      },
      options: {
        aspectRatio: 3, // Set the aspect ratio to 2:1
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  generateOperationPerApplicationChart() {
    const operationPerApplication = this.listOperation.reduce((acc:any, operation) => {
      if (operation.statut === 'Planifier') { 
        const applicationTitle = operation.application.nomApplication;
        if (!acc[applicationTitle]) {
          acc[applicationTitle] = 0;
        }
        acc[applicationTitle]++;
      }
      return acc;
    }, {});
  
    const labels = Object.keys(operationPerApplication);
    const data = Object.values(operationPerApplication);
    const backgroundColors = Array.from({ length: labels.length }, () => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgba(${r}, ${g}, ${b}, 0.5)`;
    });
    // Create a chart using Chart.js
    const chart = new Chart('operationPerApplicationChart', {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            label: 'Number of Operations',
            data,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors.map(color => color.replace('0.5', '1')),
     
            borderWidth: 1
          }
        ]
      },
      options: {
        aspectRatio: 1.1, // Set the aspect ratio to 2:1
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
     
    });
  }
  generateOperationPerMonthChart(year: number) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const operationsPerMonth = this.listOperation.reduce((acc: any, operation) => {
      const dateAjout = new Date(operation.dateAjout);
      if (isNaN(dateAjout.getMonth())) {
        // Skip this incident if dateAjout is not a valid date
        return acc;
      }
      const operationYear = dateAjout.getFullYear();
      if (operationYear !== year) {
        // Skip this incident if it's not from the specified year
        return acc;
      }
      const monthIndex = dateAjout.getMonth();
      const monthName = monthNames[monthIndex];
      if (!acc[monthName]) {
        acc[monthName] = 0;
      }
      if (operation.statut === 'Planifier') {
        acc[monthName]++;
      }
      return acc;
    }, {});
    
    const datasets = [{
      label: 'Operation planifier par Mois',
      data: monthNames.map(monthName => operationsPerMonth[monthName] || 0),
      backgroundColor: this.getRandomColor()
    }];
    
    const chart = new Chart('operationPerMonthChart', {
      type: 'line',
      data: {
        labels: monthNames,
        datasets
      },
      options: {
        aspectRatio: 2, // Set the aspect ratio to 2:1
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

    
  generateOperationPerLotChart() {
    const lots = Array.from(new Set(this.listOperation.map(operation => operation.application.lot)));
  
    const operationPerLots = this.listOperation.reduce((acc: any, operation) => {
      const lot = operation.application.lot;
      const statut = operation.statut;
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
  
    const chart = new Chart('operationPerLotsChart', {
      type: 'bar',
      data: {
        labels: ['Nombre d\'operation par lots'],
        datasets
      },
      options: {
        aspectRatio: 2, // Set the aspect ratio to 2:1
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  generateOperationPerStatutChart() {
    const statuts = Array.from(new Set(this.listOperation.map(operation => operation.statut)));
  
    const operationPerStatut = this.listOperation.reduce((acc: any, operation) => {
      const statut = operation.statut;
      if (!acc[statut]) {
        acc[statut] = 0;
      }
      acc[statut]++;
      return acc;
    }, {});

      const labels = Object.keys(operationPerStatut);
      const data = Object.values(operationPerStatut);
        const backgroundColors = Array.from({ length: labels.length }, () => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgba(${r}, ${g}, ${b}, 0.5)`;
    });
     // Create a chart using Chart.js
    const chart = new Chart('operationPerStatutChart', {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            label: 'Number of Operation',
            data,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors.map(color => color.replace('0.5', '1')),
            borderWidth: 1
          }
        ]
      },
      options: {
        aspectRatio: 1.1, // Set the aspect ratio to 2:1
        scales: {
          y: {
            beginAtZero: true
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
    backgroundColor: this.getRandomColor()
  }));

  const chart = new Chart('changePerStatutChartMonth', {
    type: 'bar',
    data: {
      labels: monthNames,
      datasets
    },
    options: {
      aspectRatio: 3, // Set the aspect ratio to 2:1
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
generateChangePerApplicationChart() {
  const changePerApplication = this.listChange.reduce((acc:any, change) => {
    if (change.statut === 'Planifié') { 
      const applicationTitle = change.application.nomApplication;
      if (!acc[applicationTitle]) {
        acc[applicationTitle] = 0;
      }
      acc[applicationTitle]++;
    }
    return acc;
  }, {});

  const labels = Object.keys(changePerApplication);
  const data = Object.values(changePerApplication);
  const backgroundColors = Array.from({ length: labels.length }, () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.5)`;
  });
  // Create a chart using Chart.js
  const chart = new Chart('changePerApplicationChart', {
    type: 'doughnut',
    data: {
      labels,
      datasets: [
        {
          label: 'Nombre de Changement planifier',
          data,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map(color => color.replace('0.5', '1')),
   
          borderWidth: 1
        }
      ]
    },
    options: {
      aspectRatio: 1.1, // Set the aspect ratio to 2:1
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
   
  });
}
generateChangePerMonthChart(year: number) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const changePerMonth = this.listChange.reduce((acc: any, change) => {
    const dateAjout = new Date(change.dateAjout);
    if (isNaN(dateAjout.getMonth())) {
      // Skip this incident if dateAjout is not a valid date
      return acc;
    }
    const changeYear = dateAjout.getFullYear();
    if (changeYear !== year) {
      // Skip this incident if it's not from the specified year
      return acc;
    }
    const monthIndex = dateAjout.getMonth();
    const monthName = monthNames[monthIndex];
    if (!acc[monthName]) {
      acc[monthName] = 0;
    }
    if (change.statut === 'Planifié') {
      acc[monthName]++;
    }
    return acc;
  }, {});
  
  const datasets = [{
    label: 'Changement planifier par Mois',
    data: monthNames.map(monthName => changePerMonth[monthName] || 0),
    backgroundColor: this.getRandomColor()
  }];
  
  const chart = new Chart('changePerMonthChart', {
    type: 'line',
    data: {
      labels: monthNames,
      datasets
    },
    options: {
      aspectRatio: 2, // Set the aspect ratio to 2:1
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

  
generateChangePerLotChart() {
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

  const chart = new Chart('changePerLotsChart', {
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
      }
    }
  });
}

generateChangePerStatutChart() {

  const changePerStatut = this.listChange.reduce((acc: any, change) => {
    const statut = change.statut;
    if (!acc[statut]) {
      acc[statut] = 0;
    }
    acc[statut]++;
    return acc;
  }, {});

    const labels = Object.keys(changePerStatut);
    const data = Object.values(changePerStatut);
      const backgroundColors = Array.from({ length: labels.length }, () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.5)`;
  });
   // Create a chart using Chart.js
  const chart = new Chart('changePerStatutChart', {
    type: 'pie',
    data: {
      labels,
      datasets: [
        {
          label: 'Nombre de changement planifier',
          data,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map(color => color.replace('0.5', '1')),
          borderWidth: 1
        }
      ]
    },
    options: {
      aspectRatio: 1.1, // Set the aspect ratio to 2:1
      scales: {
        y: {
          beginAtZero: true
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
