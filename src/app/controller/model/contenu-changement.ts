import { ChangementPlanifier } from "./changement-planifier";

export class ContenuChangement {
    public id: number = Number(0);
    public titre: string = String();
    public description: string = String();
    public changementPlanifier = new ChangementPlanifier; 
}
