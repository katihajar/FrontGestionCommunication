import { HealthCheckFlamingo } from "./health-check-flamingo";

export class FluxEAI {
    public id: number = Number(0);
    public process: string = String();
    public subProcess: string = String();
    public etat: string = String();
    public commentaire: string = String();
    public healthCheckFlamingo =new HealthCheckFlamingo();
}
