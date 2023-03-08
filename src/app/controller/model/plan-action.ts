import { Incident } from "./incident";

export class PlanAction {
    public numero: number = Number(0);
    public statut: string = String();
    public description: string = String();
    private incident=new Incident();
}
