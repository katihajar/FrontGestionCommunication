import { Application } from "./application";
import { ContenuChangement } from "./contenu-changement";
import { User } from "./user";

export class ChangementPlanifier {
    public id: number = Number(0);
    public titre: string = String();
    public statut: string = String();
    public version: string = String();
    public impactMetier: string = String();
    public detail: string = String();
    public type: string = String();
    public dateDebut: Date = new Date();
    public dateAjout: Date = new Date();
    public dateFin: Date = new Date();
    public createurChangement =new User();
    public application =new Application();
    public contenuChangementList = new Array<ContenuChangement>();
}
