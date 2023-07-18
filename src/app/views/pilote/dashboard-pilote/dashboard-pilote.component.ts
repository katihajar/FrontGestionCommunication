import { Component, OnInit } from '@angular/core';
import { Incident } from 'src/app/controller/model/incident';
import { IncidentService } from 'src/app/controller/service/incident.service';
import Chart from 'chart.js/auto';
import { Operation } from 'src/app/controller/model/operation';
import { OperationService } from 'src/app/controller/service/operation.service';
import { ChangementPlanifier } from 'src/app/controller/model/changement-planifier';
import { ChangementService } from 'src/app/controller/service/changement.service';
import { HealthChekPreprodProd } from 'src/app/controller/model/health-chek-preprod-prod';
import * as moment from 'moment';
import { HealthCheckService } from 'src/app/controller/service/health-check.service';
import { ApplicationService } from 'src/app/controller/service/application.service';
import { Application } from 'src/app/controller/model/application';
import { Table } from 'primeng/table';
import * as FileSaver from 'file-saver';
import { HealthCheckBwPerimetre } from 'src/app/controller/model/health-check-bw-perimetre';
import { HealthCheckBwPerimetreService } from 'src/app/controller/service/health-check-bw-perimetre.service';

@Component({
  selector: 'app-dashboard-pilote',
  templateUrl: './dashboard-pilote.component.html',
  styleUrls: ['./dashboard-pilote.component.scss']
})
export class DashboardPiloteComponent implements OnInit {

  listIncident:Array<Incident>=new Array<Incident>();
  listofTodayIncident:Array<Incident>=new Array<Incident>();
  listApp:Array<Application>= new Array<Application>();
  typeCom:any[]=[];
  selectedCom:string=String();
  selectedApp:string=String();
  listOperation:Array<Operation>=new Array<Operation>();
  listChange:Array<ChangementPlanifier>=new Array<ChangementPlanifier>();
  listChangeFiltred:Array<ChangementPlanifier>=new Array<ChangementPlanifier>();
  listIncidentFiltred:Array<Incident>=new Array<Incident>();
  listOperationFiltred:Array<Operation>=new Array<Operation>();
  listHealthCheckProd:Array<HealthChekPreprodProd>=new Array<HealthChekPreprodProd>();
  listHealthCheckBwPerimetre:Array<HealthCheckBwPerimetre>=new Array<HealthCheckBwPerimetre>();
  dateRange = {
    start: moment().startOf('month'),
    end: moment().endOf('month')
  };
  dateRangeIncident = {
    start: moment().startOf('month'),
    end: moment().endOf('month')
  };
  dateRangeOperation = {
    start: moment().startOf('month'),
    end: moment().endOf('month')
  };
  dateRangeChng= {
    start: moment().startOf('month'),
    end: moment().endOf('month')
  };
  dateRangehealthBw= {
    start: moment().startOf('month'),
    end: moment().endOf('month')
  };
  private chart!: Chart;
  private chart2!: Chart;
  private chartPerStatutChart!: Chart;
  private chartClosPerLotsChart!: Chart;
  private chartePerLotChart! : Chart;
  private chartOperation!: Chart;
  private chartOperationPerStatutChart!: Chart;
  private chartchng!: Chart;
  private chartchngPerStatutChart!: Chart;
  private charthealthBWPerMonthChart!: Chart;
  private charthealthBWPerDayChart!: Chart;
  private charthealthBWPerWeekChart!: Chart;
  constructor(private service: IncidentService,private operationService: OperationService,
    private changeService: ChangementService,private healthprodService: HealthCheckService,
    private appService: ApplicationService,private healthBwService: HealthCheckBwPerimetreService) { 
  }

  ngOnInit(): void {
    this.typeCom= [
      { name: 'Incident' },
      { name: 'Changement' },
      { name: 'Etat de santé monetique' },
      { name: 'Etat de santé Bi' },
    ];
  const date = new Date();
  const year = date.getFullYear();
  this.appService.FindAllApplcationPilote().subscribe((data)=>{
    //@ts-ignore
    this.listApp=data.body;    
  });
  this.service.FindTodayIncident().subscribe((data)=>{
     //@ts-ignore
    this.listofTodayIncident=data.body;     
  })
  }
  clear(table: Table) {
    table.clear();
  }
onchange(){
  this.executeFunction();
}
exportExcelChange() {
  import("xlsx").then(xlsx => {
    const worksheet = xlsx.utils.json_to_sheet(this.listChangeFiltred.map(change => {
      return {
        application: change.application.nomApplication, 
        version: change.version,
        titre: change.titre,
        statut: change.statut,
        impactMetier: change.impactMetier,
        detail:change.detail,
        dateDebut: moment(change.dateDebut).format('DD-MM-YYYY'),
        dateFin: moment(change.dateFin).format('DD-MM-YYYY')
      };
    }));
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "changement");
  });
}
  exportExcelIncident() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.listIncidentFiltred.map(incident => {
        return {
          application: incident.application.nomApplication, 
          titreIncident: incident.titreIncident,
          numeroIncident: incident.numeroIncident,
          statut: incident.statut,
          description: incident.description,
          situationActuelle: incident.situationActuelle,
          impact: incident.impact,
          causePrincipale: incident.causePrincipale,
          solutionContournement: incident.solutionContournement,
          dateDebut: moment(incident.dateDebut).format('DD-MM-YYYY'),
          dateFin: moment(incident.dateFin).format('DD-MM-YYYY')
        };
      }));
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "incident");
    });
  }
  exportExcelOperation() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.listOperationFiltred.map(operattion => {
        return {
          application: operattion.application.nomApplication, 
          titre: operattion.titre,
          numeroIncident: operattion.numero,
          statut: operattion.statut,
          description: operattion.description,
          dateDebut: moment(operattion.dateDebut).format('DD-MM-YYYY'),
          dateFin: moment(operattion.dateFin).format('DD-MM-YYYY')
        };
      }));
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "operation");
    });
  }

saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}

  executeFunction() {
    if (this.selectedCom === 'Incident' && this.selectedApp) {
      this.service.FindAllIncident().subscribe(data=>{
        //@ts-ignore
        this.listIncident = data.body;
        this.listIncidentFiltred = this.listIncident.filter(incident => incident.application.nomApplication === this.selectedApp &&
          moment(incident.dateAjout).isBetween(this.dateRangeIncident.start, this.dateRangeIncident.end)
      );
       this.generateIncidentsPerApplicationChart();
      // this.generateIncidentsClosPerLotsChart();
      // this.generateIncidentsPerLotChart();
       this.generateIncidentsPerStatutChartMonth();
      });
    } else if (this.selectedCom === 'Operation' && this.selectedApp) {
      this.operationService.FindAllOperation().subscribe(data=>{
        //@ts-ignore
        this.listOperation = data.body;
        this.listOperationFiltred=this.listOperation.filter(op => op.application.nomApplication === this.selectedApp &&
          moment(op.dateAjout).isBetween(this.dateRangeOperation.start, this.dateRangeOperation.end)
        );
       this.generateOperationPerApplicationChart();
      //  this.generateOperationTerminerPerLotChart();
      //  this.generateOperationPlanifierPerLotChart();
       this.generateOperationPerStatutChartMonth();
      });
    } else if (this.selectedCom === 'Changement' && this.selectedApp) {
      this.changeService.FindAllChange().subscribe(data=>{
        //@ts-ignore
        this.listChange = data.body;
        this.listChangeFiltred =this.listChange.filter(chang => chang.application.nomApplication === this.selectedApp &&
          moment(chang.dateAjout).isBetween(this.dateRangeChng.start, this.dateRangeChng.end)
        );
       this.generateChangePerApplicationChart();
      //  this.generateChangePlanifierPerLotChart();
      //  this.generateChangeTerminePerLotChart();
       this.generateChangePerStatutChartMonth();
      });
    } else if (this.selectedCom === 'Etat de santé monetique') {
      this.healthprodService.FindAllHealthCheck().subscribe(data=>{
        //@ts-ignore
        this.listHealthCheckProd = data.body;
       this.generateChartsHealthProd();
       this.updateChart();
      });
    } else if (this.selectedCom === 'Etat de santé Bi') {
      this.healthBwService.FindAllHealthCheckBwPilote().subscribe(data=>{
        //@ts-ignore
        this.listHealthCheckBwPerimetre= data.body;
       this.generateChartsHealthBW();
       this.updateChartBw();
      });
    }
  }
  isChartVisible(chartId: string): boolean {
    if (this.selectedCom === 'Incident') {
      // Logic to determine visibility based on chartId
      if (chartId === 'incidentsPerStatutChartMonth') {
        // Return true if this chart should be visible
        return true;
      } else if (chartId === 'incidentsPerLotsChart') {
        // Return true if this chart should be visible
        return true;
      } else if (chartId === 'incidentsClosPerLotsChart') {
        // Return true if this chart should be visible
        return true;
      } else if (chartId === 'combinedChart') {
        // Return true if this chart should be visible
        return true;
      }
    }
  
    // If the selectedCom is not 'Incident' or chartId is not recognized, return false
    return false;
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
  onStartDateChangedIncident(event: Event) {
    const startDateStr = (event.target as HTMLInputElement).value;
    const startDate = moment(startDateStr);
    if (startDate.isValid()) {
      this.dateRangeIncident.start = startDate;
      this.executeFunction();
      
    }
  }
  
  onEndDateChangedIncident(event: Event) {
    const endDateStr = (event.target as HTMLInputElement).value;
    const endDate = moment(endDateStr);
    if (endDate.isValid()) {
      this.dateRangeIncident.end = endDate;
      this.executeFunction();
    }
  }
  onStartDateChangedOpeartion(event: Event) {
    const startDateStr = (event.target as HTMLInputElement).value;
    const startDate = moment(startDateStr);
    if (startDate.isValid()) {
      this.dateRangeOperation.start = startDate;
      this.executeFunction();
      
    }
  }
  
  onEndDateChangedOpeartion(event: Event) {
    const endDateStr = (event.target as HTMLInputElement).value;
    const endDate = moment(endDateStr);
    if (endDate.isValid()) {
      this.dateRangeOperation.end = endDate;
      this.executeFunction();
    }
  }
  onStartDateChangedChang(event: Event) {
    const startDateStr = (event.target as HTMLInputElement).value;
    const startDate = moment(startDateStr);
    if (startDate.isValid()) {
      this.dateRangeChng.start = startDate;
      this.executeFunction();
      
    }
  }
  
  onEndDateChangedChang(event: Event) {
    const endDateStr = (event.target as HTMLInputElement).value;
    const endDate = moment(endDateStr);
    if (endDate.isValid()) {
      this.dateRangeChng.end = endDate;
      this.executeFunction();
    }
  }
  onStartDateChangedhealthBW(event: Event) {
    const startDateStr = (event.target as HTMLInputElement).value;
    const startDate = moment(startDateStr);
    if (startDate.isValid()) {
      this.dateRangehealthBw.start = startDate;
      this.executeFunction();
      
    }
  }
  
  onEndDateChangedhealthBW(event: Event) {
    const endDateStr = (event.target as HTMLInputElement).value;
    const endDate = moment(endDateStr);
    if (endDate.isValid()) {
      this.dateRangehealthBw.end = endDate;
      this.executeFunction();
    }
  }
// Chart Incident 
  
  generateIncidentsPerStatutChartMonth() {
    if (this.chartPerStatutChart) {
      this.chartPerStatutChart.destroy();
    }
    const filteredIncidents = this.listIncident.filter(incident => incident.application.nomApplication === this.selectedApp);
    const monthNames = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aout', 'Sep', 'Oct', 'Nov', 'Dec'];
    const statut = Array.from(new Set(filteredIncidents.map(incident => incident.statut)));
  
    const incidentsPerApplication = filteredIncidents.reduce((acc:any, incident) => {
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
  
    this.chartPerStatutChart= new Chart('incidentsPerStatutChartMonth', {
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
    if (this.chart2) {
      this.chart2.destroy();
    }
    // Filter incidents based on the selected application
    const filteredIncidents = this.listIncident.filter(incident => incident.application.nomApplication === this.selectedApp &&
      moment(incident.dateAjout).isBetween(this.dateRangeIncident.start, this.dateRangeIncident.end)
  );
  
    const incidentsClosPerApplication = filteredIncidents.reduce((acc: any, incident) => {
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
    const incidentsOpenPerApplication = filteredIncidents.reduce((acc: any, incident) => {
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
    const allLabels = [
      ...new Set([...Object.keys(incidentsClosPerApplication), ...Object.keys(incidentsOpenPerApplication)])
    ];
  
    // Create datasets for both open and closed incidents
    const closedData = allLabels.map(label => incidentsClosPerApplication[label] || 0);
    const openData = allLabels.map(label => incidentsOpenPerApplication[label] || 0);
  
    // Assign colors to datasets
  
    // Create a chart using Chart.js
    this.chart2 = new Chart('combinedChart', {
      type: 'bar',
      data: {
        labels: allLabels,
        datasets: [
          {
            label: "Nombre d'Incidents cloturé",
            data: closedData,
            backgroundColor: '#8bd3c7',
            borderColor: '#00b300',
            borderWidth: 1
          },
          {
            label: "Nombre d'incident ouvert",
            data: openData,
            backgroundColor: '#fd7f6f',
            borderColor: '#ff1a1a',
            borderWidth: 1
          }
        ]
      },
      options: {
        aspectRatio: 1, // Set the aspect ratio to 2:1
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          title: {
            display: true,
            text: "Nombre d'incidents ouverts et cloturés "+this.selectedApp,
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
    if(this.chartClosPerLotsChart){
      this.chartClosPerLotsChart.destroy();
    }
    const filteredIncidents = this.listIncident.filter(incident => incident.application.nomApplication === this.selectedApp);

    const lots = Array.from(new Set(filteredIncidents.map(incident => incident.application.lot)));
  
    const incidentsPerLots = filteredIncidents.reduce((acc: any, incident) => {
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
  
    this.chartClosPerLotsChart = new Chart('incidentsClosPerLotsChart', {
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
    if(this.chartePerLotChart){
      this.chartePerLotChart.destroy();
    }
    const filteredIncidents = this.listIncident.filter(incident => incident.application.nomApplication === this.selectedApp);

    const lots = Array.from(new Set(filteredIncidents.map(incident => incident.application.lot)));
  
    const incidentsPerLots = filteredIncidents.reduce((acc: any, incident) => {
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
  
    this.chartePerLotChart = new Chart('incidentsPerLotsChart', {
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
    if(this.chartOperationPerStatutChart){
      this.chartOperationPerStatutChart.destroy();
    }
    const filteredOperation = this.listOperation.filter(op => op.application.nomApplication === this.selectedApp 
  );
    const monthNames = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aout', 'Sep', 'Oct', 'Nov', 'Dec'];
    const statut = Array.from(new Set(this.listOperation.map(operation => operation.statut)));
  
    const operationPerApplication = filteredOperation.reduce((acc:any, operation) => {
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
  
    this.chartOperationPerStatutChart = new Chart('operationPerStatutChartMonth', {
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
    if(this.chartOperation){
      this.chartOperation.destroy();
    }
      const filteredOperation = this.listOperation.filter(op => op.application.nomApplication === this.selectedApp &&
        moment(op.dateAjout).isBetween(this.dateRangeOperation.start, this.dateRangeOperation.end)
    );
    const OperationPlanifierPerApplication = filteredOperation.reduce((acc:any, operation) => {
      if (operation.statut === 'Planifiée') { 
        const applicationTitle = operation.application.nomApplication;
        if (!acc[applicationTitle]) {
          acc[applicationTitle] = 0;
        }
        acc[applicationTitle]++;
      }
      return acc;
    }, {});
    
    const OperationTerminePerApplication = filteredOperation.reduce((acc:any, operation) => {
      if (operation.statut === 'Terminée') { 
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
  
    // Create datasets for both open and closed incidents
    const closedData = allLabels.map(label => OperationPlanifierPerApplication[label] || 0);
    const openData = allLabels.map(label => OperationTerminePerApplication[label] || 0);    
    // Create a chart using Chart.js
    this.chartOperation = new Chart('operationPerApplicationChart', {
      type: 'bar',
      data: {
        labels: allLabels,
        datasets: [
          {
            label: 'Nombre d\'operation planifiée',
            data: closedData,
            backgroundColor:'#fd7f6f',
            borderColor: '#ff1a1a',
            borderWidth: 1
          },
          {
            label: 'Nombre d\'operation terminée',
            data: openData,
            backgroundColor: '#8bd3c7',
            borderColor: '#00b300',
            borderWidth: 1
          }
        ]
      },
      options: {
        aspectRatio: 1, // Set the aspect ratio to 2:1
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Nombre d\'operation planifiée et terminée par Application',
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
      if (statut === "Terminée") {
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
        labels: ['Nombre d\'operation terminée par lots'],
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
            text: 'Nombre d\'operation terminée par lots',
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
      if (statut === "Planifiée") {
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
        labels: ['Nombre d\'operation planifiée par lots'],
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
            text: 'Nombre d\'operation planifiée par lots',
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
  if(this.chartchngPerStatutChart){
    this.chartchngPerStatutChart.destroy();
  }
  const filteredChang = this.listChange.filter(chng => chng.application.nomApplication === this.selectedApp 
    );
  const monthNames = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aout', 'Sep', 'Oct', 'Nov', 'Dec'];

  const statut = Array.from(new Set(this.listChange.map(change => change.statut)));

  const changePerApplication = filteredChang.reduce((acc:any, change) => {
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

  this.chartchngPerStatutChart = new Chart('changePerStatutChartMonth', {
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
  if(this.chartchng){
    this.chartchng.destroy();
  }
  const filteredChang= this.listChange.filter(chng => chng.application.nomApplication === this.selectedApp &&
    moment(chng.dateAjout).isBetween(this.dateRangeChng.start, this.dateRangeChng.end)
);
  const changementPlanifierPerApplication = filteredChang.reduce((acc:any, change) => {
    if (change.statut === 'Planifié') { 
      const applicationTitle = change.application.nomApplication;
      if (!acc[applicationTitle]) {
        acc[applicationTitle] = 0;
      }
      acc[applicationTitle]++;
    }
    return acc;
  }, {});
  
  const changementTerminePerApplication = filteredChang.reduce((acc:any, change) => {
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
  
  // Create datasets for both open and closed incidents
  const plannedData = allLabels.map(label => changementPlanifierPerApplication[label] || 0);
  const terminerData = allLabels.map(label => changementTerminePerApplication[label] || 0);
    
  // Create a chart using Chart.js
  this.chartchng = new Chart('changePerApplicationChart', {
    type: 'bar',
    data: {
      labels: allLabels,
      datasets: [
        {
          label: 'Nombre de changement planifiée',
          data: plannedData,
          backgroundColor:'#fd7f6f',
          borderColor: '#ff1a1a',
          borderWidth: 1
        },
        {
          label: 'Nombre de changement terminée',
          data: terminerData,
          backgroundColor: '#8bd3c7',
            borderColor: '#00b300',
          borderWidth: 1
        }
      ]
    },
    options: {
      aspectRatio: 1, // Set the aspect ratio to 2:1
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Nombre de changement planifiée et terminée par Application',
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
      labels: ['Nombre de changement terminée par lots'],
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
          text: 'Nombre de changement terminée par lots',
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
      labels: ['Nombre de changement planifiée par lots'],
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
          text: 'Nombre de changement planifiée par lots',
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

////////////////////HealthBWPerimetre//////
getHealthBWPerWeekOfCurrentMonth(): number[] {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const startDate = new Date(startOfMonth);
  startDate.setDate(startDate.getDate() - startDate.getDay() + 1); // get the start date of the first week of the month
  const endDate = new Date(endOfMonth);
  endDate.setDate(endDate.getDate() - endDate.getDay() + 7); // get the end date of the last week of the month
  const numWeeks = Math.ceil((endDate.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
  const healthCheckPerWeek = new Array(numWeeks).fill(0);

  this.listHealthCheckBwPerimetre.forEach(healthCheck => {
    const date = new Date(healthCheck.dateAjout);
    if (date >= startDate && date <= endDate) {
      const weekIndex = Math.floor((date.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
      healthCheckPerWeek[weekIndex]++;
    }
  });

  return healthCheckPerWeek;
}
private getHealthBWWeekLabels(): string[] {
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
getHealthCheckBWPerDayOfCurrentWeek(): number[] {
  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay();
  const firstDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDayOfWeek);
  const healthCheckCounts: number[] = new Array(7).fill(0);

  this.listHealthCheckBwPerimetre.forEach(healthCheck => {
    const healthCheckDate = new Date(healthCheck.dateAjout);
    if (healthCheckDate >= firstDayOfWeek ) {
      const dayOfWeek = healthCheckDate.getDay();
      healthCheckCounts[dayOfWeek]++;

    }
  });

  return healthCheckCounts;
}
getHealthCheckBWPerMonthOfCurrentYear(): number[] {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const healthCheckCounts: number[] = new Array(12).fill(0);

  this.listHealthCheckBwPerimetre.forEach(healthCheck => {
    const healthCheckDate = new Date(healthCheck.dateAjout);
    if (healthCheckDate.getFullYear() === currentYear) {
      const monthIndex = healthCheckDate.getMonth();
      healthCheckCounts[monthIndex]++;
    }
  });

  return healthCheckCounts;
}
generateChartsHealthBW(): void {
  if(this.charthealthBWPerWeekChart){
    this.charthealthBWPerWeekChart.destroy();
  };
  if(this.charthealthBWPerMonthChart){
    this.charthealthBWPerMonthChart.destroy();
  }
  if(this.charthealthBWPerDayChart){
    this.charthealthBWPerDayChart.destroy();
  }
  // Chart for health check per week
  this.charthealthBWPerWeekChart = new Chart('healthCheckBWPerWeekChart', {
    type: 'line',
    data: {
      labels: this.getHealthBWWeekLabels(),
      datasets: [{
        label: 'Health Check Per Week',
        data: this.getHealthBWPerWeekOfCurrentMonth(),
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
  this.charthealthBWPerDayChart = new Chart('healthCheckBWPerDayChart', {
    type: 'bar',
    data: {
      labels: ['Dimanch', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
      datasets: [{
        label: 'Health Check Per Day',
        data: this.getHealthCheckBWPerDayOfCurrentWeek(),
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
  this.charthealthBWPerMonthChart = new Chart('healthCheckBWPerMonthChart', {
    type: 'bar',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aout', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Health Check Per Month',
        data: this.getHealthCheckBWPerMonthOfCurrentYear(),
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
private updateChartBw() {
  if (this.chart) {
    this.chart.destroy();
  }

  const startDate = this.dateRangehealthBw.start.toDate();
  const endDate = this.dateRangehealthBw.end.toDate();

  // Set Monday as the first day of the week
  moment.updateLocale('en', {
    week: {
      dow: 1 // Monday
    }
  });

  const numHealthChecksPerDay: {[date: string]: number} = {};
  let totalNumHealthChecks = 0;
  
  this.listHealthCheckBwPerimetre.forEach((hc) => {
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

  const ctx = document.getElementById('health-check-bw-chart') as HTMLCanvasElement;
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
