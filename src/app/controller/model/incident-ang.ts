import { Application } from "./application";
import { PlanAction } from "./plan-action";
import { User } from "./user";

export class IncidentAng {
    public id: number = Number(0);
    public numeroIncident: string = String();
    public titreIncident: string = String();
    public statut: string = String();
    public description: string = String();
    public situationActuelle: string = String();
    public impact: string = String();
    public causePrincipale: string = String();
    public solutionContournement: string = String();
    public dateDebut: Date = new Date();
    public dateFin: Date = new Date();
    public application =new Application();
    public prochaineCommunication: Date = new Date();
    public planActions =new Array<PlanAction>();
    public createurIncident =new User();
}
