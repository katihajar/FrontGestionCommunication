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
    public debut: string = String();
    public planRollBack: string = String();
    public dateDebut: Date | null= null;
    public dateAjout: Date = new Date();
    public prochaineCom: Date = new Date();
    public dateFin: Date | null= null;
    public createurChangement =new User();
    public application =new Application();
    public contenuChangementList = new Array<ContenuChangement>();
}
