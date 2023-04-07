import { Component, OnInit } from '@angular/core';
import { Incident } from 'src/app/controller/model/incident';
import { IncidentService } from 'src/app/controller/service/incident.service';
import Chart from 'chart.js/auto';
import { style } from '@angular/animations';

@Component({
  selector: 'app-dashboard-pilote',
  templateUrl: './dashboard-pilote.component.html',
  styleUrls: ['./dashboard-pilote.component.scss']
})
export class DashboardPiloteComponent implements OnInit {

listIncident:Array<Incident>=new Array<Incident>();
  constructor(private service: IncidentService) { 
  }

  ngOnInit(): void {
    this.service.FindAllIncident().subscribe(data=>{
      //@ts-ignore
      this.listIncident = data.body;
     console.log(this.listIncident.length);
     this.generateIncidentsPerApplicationChart();
     this.generateIncidentsPerMonthChart();
     this.generateIncidentsPerLotChart();
     this.generateIncidentsPerStatutChart();
     this.generateIncidentsPerStatutChartMonth();
    })
  }


  
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
        responsive: true,
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
      const applicationTitle = incident.application.nomApplication;
      if (!acc[applicationTitle]) {
        acc[applicationTitle] = 0;
      }
      acc[applicationTitle]++;
      return acc;
    }, {});
  
    // Convert the incidents per application object into two arrays for labels and data
    const labels = Object.keys(incidentsPerApplication);
    const data = Object.values(incidentsPerApplication);
  
    // Create a chart using Chart.js
    const chart = new Chart('incidentsPerApplicationChart', {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            label: 'Number of Incidents',
            data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        
        aspectRatio: 1.1, // Set the aspect ratio to 2:1
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
     
    });
  }
  

  generateIncidentsPerMonthChart() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    const incidentsPerMonth = this.listIncident.reduce((acc: any, incident) => {
      const dateAjout = new Date(incident.dateAjout);
      if (isNaN(dateAjout.getMonth())) {
        // Skip this incident if dateDebut is not a valid date
        return acc;
      }
      const monthIndex = dateAjout.getMonth();
      const monthName = monthNames[monthIndex];
      if (!acc[monthName]) {
        acc[monthName] = 0;
      }
      acc[monthName]++;
      return acc;
    }, {});
  
    const datasets = [{
      label: 'Incidents par Mois',
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
        responsive: true,
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
  
    const incidentsPerlots = this.listIncident.reduce((acc: any, incident) => {
      const lot = incident.application.lot;
      if (!acc[lot]) {
        acc[lot] = 0;
      }
      acc[lot]++;
      return acc;
    }, {});
  
    const datasets = lots.map(lot => ({
      label: lot,
      data: [incidentsPerlots[lot] || 0],
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
        responsive: true,
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
    
     // Create a chart using Chart.js
    const chart = new Chart('incidentsPerStatutChart', {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            label: 'Number of Incidents',
            data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        aspectRatio: 1.1, // Set the aspect ratio to 2:1
        responsive: true, // Enable responsiveness
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
