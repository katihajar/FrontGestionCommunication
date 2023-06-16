import { Application } from "./application";
import { PlanAction } from "./plan-action";
import { User } from "./user";

export class Incident {
    public id: number = Number(0);
    public numeroIncident: string = String();
    public titreIncident: string = String();
    public statut: string = String();
    public description: string = String();
    public situationActuelle: string = String();
    public type: string = String();
    public detailResolution: string = String();
    public actionPrise: string = String();
    public impact: string = String();
    public causePrincipale: string = String();
    public solutionContournement: string = String();
    public dateDebut: Date | null=null;
    public dateAjout: Date = new Date();
    public dateFin: Date | null=null;
    public application =new Application();
    public prochaineCommunication: Date = new Date();
    public createurIncident =new User();
    public planActionList = new Array<PlanAction>();
}
