import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Perimetre } from 'src/app/controller/model/perimetre';
import { PerimetreService } from 'src/app/controller/service/perimetre.service';

@Component({
  selector: 'app-registre-perimetre',
  templateUrl: './registre-perimetre.component.html',
  styleUrls: ['./registre-perimetre.component.scss']
})
export class RegistrePerimetreComponent implements OnInit {

  loading: boolean = true;
  dialogAjoutPerimetre: boolean = false;
  dialogEditePerimetre: boolean = false;
  constructor(private perimetreService :PerimetreService,private messageService: MessageService) { }
  clear(table: Table) {
    table.clear();
  }
  ngOnInit(): void {
    this.FindAllPerimetre();
  }
  ShowModifDialog(perimetre: Perimetre){
    this.ModifierPerimetre = perimetre;
    this.dialogEditePerimetre = true;
  }
  get ListAllPerimentre():  Array<Perimetre>{
    return this.perimetreService.ListAllPerimentre;
  }

  set ListAllPerimentre(value: Array<Perimetre>) {
    this.perimetreService.ListAllPerimentre = value;
  }
 
  get AddPerimetre(): Perimetre{
    return this.perimetreService.AddPerimetre;
  }

  set AddPerimetre(value: Perimetre) {
    this.perimetreService.AddPerimetre = value;
  }

  get ModifierPerimetre(): Perimetre{
    return this.perimetreService.ModifierPerimetre;
  }

  set ModifierPerimetre(value: Perimetre) {
    this.perimetreService.ModifierPerimetre = value;
  }
  FindAllPerimetre() {
    this.perimetreService.FindAllPerimetre().subscribe((data) => {
      // @ts-ignore
      this.ListAllPerimentre = data.body;
      this.loading = false;
    })
  }
  SavePerimetre(){
    if(this.AddPerimetre.titre != null){
    this.perimetreService.SavePerimetre().subscribe((data) => {
           this.AddPerimetre=new Perimetre();
           this.FindAllPerimetre();
           this.dialogAjoutPerimetre = false;
           this.messageService.add({severity:'success', summary: 'Success', detail: 'Périmètre Ajouter avec succès'});

    },error=>{
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Erreur lors de l\'enregistrement'});
    })
  }else{
    this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Insérer tout les champs'});
  }
  }
  UpdatePerimetre(){
    if(this.ModifierPerimetre.titre != null){
    this.perimetreService.UpdatePerimetre().subscribe((data) => {
           this.ModifierPerimetre=new Perimetre();
           this.FindAllPerimetre();
           this.dialogEditePerimetre = false;
           this.messageService.add({severity:'success', summary: 'Success', detail: 'Périmètre Modifier avec succès'});

    },error=>{
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Erreur lors de l\'enregistrement'});
    })
  }else{
    this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Insérer tout les champs'});
  }
  }
}
