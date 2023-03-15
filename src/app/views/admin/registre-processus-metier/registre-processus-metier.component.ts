import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProcessusMetier } from 'src/app/controller/model/processus-metier';
import { ProcessusMetierService } from 'src/app/controller/service/processus-metier.service';

@Component({
  selector: 'app-registre-processus-metier',
  templateUrl: './registre-processus-metier.component.html',
  styleUrls: ['./registre-processus-metier.component.scss']
})
export class RegistreProcessusMetierComponent implements OnInit {
  loading: boolean = true;
  dialogAjoutProc: boolean = false;
  dialogEditeProc: boolean = false;
  constructor(private processusMetierService :ProcessusMetierService,private messageService: MessageService) { }
  clear(table: Table) {
    table.clear();
  }
  ngOnInit(): void {
    this.FindAllProcessusMetier();
  }
  get ListAllProcessusMetier():  Array<ProcessusMetier>{
    return this.processusMetierService.ListAllProcessusMetier;
  }

  set ListAllProcessusMetier(value: Array<ProcessusMetier>) {
    this.processusMetierService.ListAllProcessusMetier = value;
  }
 
  get ModifierProcessusMetier(): ProcessusMetier{

    return this.processusMetierService.ModifierProcessusMetier;
  }

  set ModifierProcessusMetier(value: ProcessusMetier) {
    this.processusMetierService.ModifierProcessusMetier = value;
  }

  get AddProcessusMetier(): ProcessusMetier{
    return this.processusMetierService.AddProcessusMetier;
  }

  set AddProcessusMetier(value: ProcessusMetier) {
    this.processusMetierService.AddProcessusMetier = value;
  }
  ShowModifDialog(processusMetier: ProcessusMetier){
    this.ModifierProcessusMetier = processusMetier;
    this.dialogEditeProc = true;
  }
  FindAllProcessusMetier() {
    this.processusMetierService.FindAllProcessusMetier().subscribe((data) => {
      // @ts-ignore
      this.ListAllProcessusMetier = data.body;
      this.loading = false;
    })
  }
  SaveProcessusMetire(){
    if(this.AddProcessusMetier.titre != ''){
    this.processusMetierService.SaveProcessusMetier().subscribe((data) => {
           this.AddProcessusMetier=new ProcessusMetier();
           this.FindAllProcessusMetier();
           this.dialogAjoutProc = false;
           this.messageService.add({severity:'success', summary: 'Success', detail: 'Processus Métier Ajouter avec succès'});

    },error=>{
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Erreur lors de l\'enregistrement'});
    })
  }else{
    this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Insérer tout les champs'});
  }
  }
  UpdateProcessusMetire(){
    if(this.ModifierProcessusMetier.titre != ''){
    this.processusMetierService.UpdateProcessusMetier().subscribe((data) => {
           this.ModifierProcessusMetier=new ProcessusMetier();
           this.FindAllProcessusMetier();
           this.dialogEditeProc = false;
           this.messageService.add({severity:'success', summary: 'Success', detail: 'Processus Métier Modifier avec succès'});

    },error=>{
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Erreur lors de l\'enregistrement'});
    })
  }else{
    this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Insérer tout les champs'});
  }
  }
}
