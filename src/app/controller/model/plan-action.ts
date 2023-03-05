import { Incident } from "./incident";

export class PlanAction {
    public id: number = Number(0);
    public numero: number = Number(0);
    public statut: string = String();
    public description: string = String();
    private incident=new Incident();
}
